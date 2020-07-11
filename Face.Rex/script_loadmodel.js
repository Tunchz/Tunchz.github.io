//const imageUpload = document.getElementById('imageUpload')
const video = document.getElementById('video');
const isWidthSmall = window.matchMedia("(max-width:700px)");
const isHeightSmall = window.matchMedia("(max-height:700px)");

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('https://tunchz.github.io/Face.Rex/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('https://tunchz.github.io/Face.Rex/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('https://tunchz.github.io/Face.Rex/models'),
]).then(startVideo) //then(start)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}



video.addEventListener('play',async () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)

  /****Event Listeiner for the video****/
  screenResizeW(isWidthSmall);
  isWidthSmall.addListener(screenResizeW);

  screenResizeH(isHeightSmall);
  isHeightSmall.addListener(screenResizeH);

  /****Fixing the video with based on size size  ****/
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



  var displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  const noti = new faceapi.draw.DrawBox({ x: 0, y: 10, width: 0, height: 0 }, { label: " Loading face model... " });
  noti.draw(canvas);
  //console.log("model load start");

  //const labeledFaceDescriptors = await loadLabeledImages()
    /**** load model from save lebeled descriptor from json file ****/
  const labeledFaceDescriptors = await loadLabeledDescriptor("https://tunchz.github.io/Face.Rex/descriptors/descriptor001.json");
  //console.log("model loaded");
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
  //console.log("face matcher built");


  /****Detect face and recognize every 0.1s ****/
  setInterval(async () => {

    const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()

    const resizedDetections = faceapi.resizeResults(detections, displaySize)

    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box
      const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
      drawBox.draw(canvas)
    })
  }, 500)
})


async function loadLabeledDescriptor(filename) {
  //console.log("function called");
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
  //console.log("json loaded");
// deserialize the descriptor into float32array
  for (var x = 0; x < content.length; x++) {
    for (var y = 0; y < content[x]['_descriptors'].length; y++) {
      var results = Object.values(content[x]['_descriptors'][y]);
      content[x]._descriptors[y] = new Float32Array(results);
    }
  }
  //console.log("deserization done");
// reconstruct labeled-faces descriptor
  const labeledFaceDescriptors = await Promise.all(content.map(className => {
    const descriptors = [];
    for (var i = 0; i < className._descriptors.length; i++) {
      descriptors.push(className._descriptors[i]);
    }
    return new faceapi.LabeledFaceDescriptors(className._label, descriptors);
  }))
  //console.log("return");
  return labeledFaceDescriptors;
}