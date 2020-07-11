//const imageUpload = document.getElementById('imageUpload')
const video = document.getElementById('video');
const isWidthSmall = window.matchMedia("(max-width:700px)");
const isHeightSmall = window.matchMedia("(max-height:700px)");
let predictedAges = [];


//const fs = require('fs');

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

  
  //console.log("build models from label images and save");
  /**** construct model for face regcognition from labeled image dataset ****/
  //const labeledFaceDescriptors = await loadLabeledImages();

  /**** WITH Node.js : save descriptor to json ****/
  // save_tojson("descriptor001", labeledFaceDescriptors);

  /**** WITHOUT Node.js : Start file json download for descriptor ****/
  //download("descriptor001.json",labeledFaceDescriptors);

  console.log("load models");
  /**** load model from save lebeled descriptor from json file ****/
  const labeledFaceDescriptors = await loadLabeledDescriptor("https://tunchz.github.io/Face.Rex/descriptors/descriptor001.json");


  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)





  /****Detect face and recognize every 0.1s ****/
  setInterval(async () => {
    /**** Detect face ▶ find face landmark ▶ predict agaist face descriptor ▶ predict face expression ▶ predict age&gender****/
    const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors().withFaceExpressions().withAgeAndGender();
    /****Resize the result of detection matching the display size ****/
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    /**** Clear the previous overlay draw on the canvas ****/
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

    /**** Match the faces detected with the descriptor ****/
    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
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

      /**** get bounding box on face ****/
      const box = resizedDetections[i].detection.box
      /**** draw box wiht label ****/
      const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() + " ▶ " + Math.round(interpolatedAge) +" "+ gender +" : "+ emotion })
      drawBox.draw(canvas)
    })
  }, 100)
})


function loadLabeledImages() {
  const labels = ['Aom', 'Bally', 'P Koy', 'P Joe','Siam', 'SomZa', 'Tunchz']
  return Promise.all(
    labels.map(async label => {
      const descriptions = []
      //for (let i = 1; i <= 2; i++) {
      for (let i = 1; i <= 1; i++) {
        const img = await faceapi.fetchImage(`https://tunchz.github.io/Face.Rex/labeled_images/${label}/${i}.jpg`)
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)
      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}

function interpolateAgePredictions(age) {
  predictedAges = [age].concat(predictedAges).slice(0, 30);
  const avgPredictedAge =
    predictedAges.reduce((total, a) => total + a) / predictedAges.length;
  return avgPredictedAge;
}

/**** save to json using node.js ****/
function save_tojson(filename, array) {

  const jsonContent = JSON.stringify(array);

  fs.writeFile("./"+filename, jsonContent, 'utf8', function (err) {
      if (err) {
          return console.log(err);
      }

      console.log(filename+" was saved!");
  });

}

/**** save to json without node.js by downloading through web browser ****/
function download(filename, array) {
  const jsonContent = JSON.stringify(array);
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonContent));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

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