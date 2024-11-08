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
  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
  var displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  //console.log("test")



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

  /****Event Listeiner for the video****/
  screenResizeW(isWidthSmall);
  isWidthSmall.addListener(screenResizeW);

  screenResizeH(isHeightSmall);
  isHeightSmall.addListener(screenResizeH);


  /****Detect face and recognize every 0.1s ****/
  setInterval(async () => {

    //console.log(video.width,canvas.width)

    //const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    //const resizedDetections = faceapi.resizeResults(detections, displaySize)
    const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()

    const resizedDetections = faceapi.resizeResults(detections, displaySize)



    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)




    //faceapi.draw.drawDetections(canvas, resizedDetections)
    //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box
      const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
      drawBox.draw(canvas)
    })
  }, 100)
})

/*
async function start() {
  const container = document.createElement('div')
  container.style.position = 'relative'
  document.body.append(container)
  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
  let image
  let canvas
  document.body.append('Loaded')
  imageUpload.addEventListener('change', async () => {
    if (image) image.remove()
    if (canvas) canvas.remove()
    image = await faceapi.bufferToImage(imageUpload.files[0])
    container.append(image)
    canvas = faceapi.createCanvasFromMedia(image)

    container.append(canvas)
    const displaySize = { width: image.width, height: image.height }
    faceapi.matchDimensions(canvas, displaySize)
    const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)


    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box
      const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
      drawBox.draw(canvas)
    })
  })
}

*/

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