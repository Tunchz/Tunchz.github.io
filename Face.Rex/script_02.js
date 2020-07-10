//const imageUpload = document.getElementById('imageUpload')
const video = document.getElementById('video');
const isWidthSmall = window.matchMedia("(max-width:700px)");
const isHeightSmall = window.matchMedia("(max-height:700px)");
let predictedAges = [];

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

  /**** construct model for face regcognition from labeled image dataset ****/
  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)

  /**** define display size and format canvas size to match ****/
  var displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)

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
      const interpolatedAge = interpolateAgePredictions(age);
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