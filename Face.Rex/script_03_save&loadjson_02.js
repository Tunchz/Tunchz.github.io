
const video = document.getElementById('video');
const isWidthSmall = window.matchMedia("(max-width:700px)");
const isHeightSmall = window.matchMedia("(max-height:700px)");
let detectedfaces = [];

/**** Load all model needed for face ****/
Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('https://tunchz.github.io/Face.Rex/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('https://tunchz.github.io/Face.Rex/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('https://tunchz.github.io/Face.Rex/models'),
  faceapi.nets.faceExpressionNet.loadFromUri("https://tunchz.github.io/Face.Rex/models"),
  faceapi.nets.ageGenderNet.loadFromUri("https://tunchz.github.io/Face.Rex/models")
]).then(startVideo) //then(start)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}


/**** add event listener to precess when video plays ****/
video.addEventListener('play',async () => {

  /**** define overlay canvas for drawing the results over the vedio ****/
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)


  /****Event Listeiner for the content width is too small ****/
  screenResizeW(isWidthSmall);
  isWidthSmall.addListener(screenResizeW);
  /****Event Listeiner for the content height is too small ****/
  screenResizeH(isHeightSmall);
  isHeightSmall.addListener(screenResizeH);


  /****Fixing the display size based width ****/
  function screenResizeW(isScreenSmall) {
    if (isScreenSmall.matches) {
      video.style.width = "320px";
      video.style.height = "240px";
      canvas.style.width = "320px";
      canvas.style.height = "240px";
    } else {
      video.style.width = "640px";
      video.style.height = "480px";
      canvas.style.width = "640px";
      canvas.style.height = "480px";
    }
  }

  /****Fixing the display size based height ****/
  function screenResizeH(isScreenSmall) {
    if (isScreenSmall.matches) {
      video.style.width = "320px";
      video.style.height = "240px";
      canvas.style.width = "320px";
      canvas.style.height = "240px";
    } else {
      video.style.width = "640px";
      video.style.height = "480px";
      canvas.style.width = "640px";
      canvas.style.height = "480px";
    }
  }


  /**** define display size and format canvas size to match ****/
  var displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)

  /**** display notification ****/
  const noti = new faceapi.draw.DrawBox({ x: 0, y: 10, width: 0, height: 0 }, { label: " Loading face model... " });
  noti.draw(canvas);

  
  //console.log("load models");
  /**** load model from save lebeled descriptor from json file ****/
  const labeledFaceDescriptors = await loadLabeledDescriptor("https://tunchz.github.io/Face.Rex/descriptors/descriptor002.json");


  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)


  const detectionDelay = 1000;    //millisecond
  const verifyingPeriod = 5000;  //millisecond
  const missedDuration = 3000;
  const num_keep = verifyingPeriod/detectionDelay;
  /****Detect face and recognize every 0.1s ****/
  setInterval(async () => {
    /**** Detect face ▶ find face landmark ▶ predict agaist face descriptor ▶ predict face expression ▶ predict age&gender****/
    const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors().withFaceExpressions().withAgeAndGender();
    /****Resize the result of detection matching the display size ****/
    const resizedDetections = faceapi.resizeResults(detections, displaySize)

    /**** Match the faces detected with the descriptor ****/
    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))

    /**** Clear the previous overlay draw on the canvas ****/
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)


    var timenow = new Date();
    var numfaces = detectedfaces.length;

    results.forEach((result, i) => {

      /**** extract age gender emotion from result ****/
      const age = resizedDetections[i].age;
      const interpolatedAge = age; //interpolateAgePredictions(age);
      const gender = resizedDetections[i].gender;
      const expressions = resizedDetections[i].expressions;
      const maxValue = Math.max(...Object.values(expressions));
      const emotion = Object.keys(expressions).filter(
        item => expressions[item] === maxValue
      );



      /**** record detected faces to verify ****/
      var facefound,verifed = false;

      if (numfaces > 0) {
        for (j=0 ; j< numfaces ; j++) {
          if (detectedfaces[j].label == result.label) {
            facefound = true;
            if (detectedfaces[j].datetime.length > num_keep-1) {
              detectedfaces[j].datetime.shift();
              verifed = true;
            }
            detectedfaces[j].datetime.push(1);            
            detectedfaces[j].last = timenow;
          } 
        }


        if (!facefound) {
          detectedfaces.push({  
                              'label'     : result.label,
                              'datetime'  : [1],
                              'start'     : timenow,
                              'last'      : timenow,
                              'missed'    : 0
                            });
          //facefound = false;
        }
      } else {
        detectedfaces.push({  
                            'label'     : result.label,
                            'datetime'  : [1],
                            'start'     : timenow,
                            'last'      : timenow,
                            'missed'    : 0
                          });
      }


      /**** get bounding box on face ****/
      const box = resizedDetections[i].detection.box
      /**** draw box wiht label ****/
      if (result.label == "unknown") {
        bcolor = 'rgba(255, 0, 0, 1)';
      } else if (verifed) {
        bcolor = 'rgba(0, 0, 255, 1)';
      } else {
        bcolor = 'rgba(255, 100, 0, 1)';
      }

      const drawBox = new faceapi.draw.DrawBox(box, { label: /*result.toString()*/result.label + " ▶ " + Math.round(interpolatedAge) +" "+ gender +" : "+ emotion,
                                                    lineWidth: 2, boxColor: bcolor, drawLabelOptions: {fontSize: 12}})
      drawBox.draw(canvas)



    })

    /**** Remove expired faces ****/
    numfaces = detectedfaces.length;
    for (j=0 ; j < numfaces ; j++) {
      var timemissed = timenow.getTime() - detectedfaces[0].last.getTime();
      if (detectedfaces[0].datetime.length > num_keep-1) {
        timemissed = timemissed - 2000;
      }
          //console.log(timemissed);
      if (timemissed < missedDuration) {
        detectedfaces[0].missed = timemissed;
        var facerec = detectedfaces[0];
        detectedfaces.push(facerec);
      
      //console.log(j,facerec.label,facerec.datetime.length,timemissed,detectedfaces.length)  
      }
      detectedfaces.shift();
    }


    //console.log(detectedfaces.length)
  }, detectionDelay)
  
})



async function loadLabeledDescriptor(filename) {
// load json file
  var content = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': filename,
    'dataType': "json",
    'success': function(data) {
      content = data;
    }
  });

// deserialize the descriptor into float32array
  for (var x = 0; x < content.length; x++) {
    for (var y = 0; y < content[x]['_descriptors'].length; y++) {
      var results = Object.values(content[x]['_descriptors'][y]);
      content[x]._descriptors[y] = new Float32Array(results);
    }
  }

// reconstruct labeled-faces descriptor
  const labeledFaceDescriptors = await Promise.all(content.map(className => {
    const descriptors = [];
    for (var i = 0; i < className._descriptors.length; i++) {
      descriptors.push(className._descriptors[i]);
    }
    return new faceapi.LabeledFaceDescriptors(className._label, descriptors);
  }))
  return labeledFaceDescriptors;
}