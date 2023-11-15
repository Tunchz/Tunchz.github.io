let model, webcam, ctx, predictionCallback;

// This function sets up the model trained in Teachable Machine.
// it takes in the URL to the model, and a function to be run
// each time the model makes a new prediction.
export async function setupModel(URL, predictionCB) {
    //store the prediction callback function
    predictionCallback = predictionCB;
    // the model.json file stores a reference to the trained model
    const modelURL = `${URL}model.json`;
    // the metatadata.json file contains the text labels of your model and additional information
    const metadataURL = `${URL}metadata.json`;

    // Load the model using the tmPose library
    model = await window.tmPose.load(modelURL, metadataURL);

    // this function from the tmPose library returns a video element that
    // shows a video feed from the webcam
    webcam = new window.tmPose.Webcam(200, 200, true); //width, height, flipped
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    // add the video element to the page
    document.getElementById('webcam-wrapper').appendChild(webcam.canvas);

    // kick off the model prediction loop
    window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    const canvas = document.getElementById('webcam-pose-canvas');
    canvas.width = 200; canvas.height = 200;
    ctx = canvas.getContext('2d');
}

// This function will run forever in a loop
async function loop() {
    // update the webcam frame
    webcam.update();
    // make a prediction using the model
    await predict();
    // then call loop again
    window.requestAnimationFrame(loop);
}

// This function uses the model we loaded to make a prediction on the webcam data
async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    // for (let i = 0; i < maxPredictions; i++) {
    //     const classPrediction =
    //         prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
    //     labelContainer.childNodes[i].innerHTML = classPrediction;
    // }

    // finally draw the poses
    drawPose(pose);

    // Call the prediction callback function now that we have new prediction data
    predictionCallback(prediction);
}

function drawPose(pose) {
    ctx.drawImage(webcam.canvas, 0, 0);
    // draw the keypoints and skeleton
    if (pose) {
        const minPartConfidence = 0.5;
        window.tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        window.tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
    }
}