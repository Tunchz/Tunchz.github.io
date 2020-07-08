//const imageUpload = document.getElementById('imageUpload')
const video = document.getElementById('video')

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('https://tunchz.github.io/Face.Rex/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('https://tunchz.github.io/Face.Rex/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('https://tunchz.github.io/Face.Rex/models')
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
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
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
  const labels = ['Aom', 'Bally', 'P Koy', 'Siam', 'SomZa', 'Tunchz']
  return Promise.all(
    labels.map(async label => {
      const descriptions = []
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(`https://tunchz.github.io/Face.Rex/labeled_images/${label}/${i}.jpg`)
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)
      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}
