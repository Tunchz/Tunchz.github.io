// Basic parameter for detection in millisecond
var detectionloopDelay = 1000;    
const verifyingPeriod = 3000;  
const missedDuration = 2000;      //must be greater than detectionloopDelay
const timetokeepverifiedfaces = 60000;
const timetoupdateResults = 60000;  // 1 minute
const facematcherThreshold = 0.49;   // greatest distance for face

// Initialize basic parameter
var num_keep = Math.ceil(verifyingPeriod/detectionloopDelay);
var loop_i = 0;
var looptoUpdate = Math.ceil(timetoupdateResults/detectionloopDelay);
var videoStart = true;
var frontCam = false; // default for mobile rear camera
var displaySize, canvas_ctx;

// Url for target google sheet script of insert the face record
//const sheetUrl = "https://script.google.com/macros/s/AKfycbxxYJAPo5auDaZiy66RizPTMGE9QxLeIbUDRw_shEDpEbQoZCg/exec";
const sheetUrl = "https://script.google.com/macros/s/AKfycbw6y-uoU3UA2-E9tLc6x0TcdQ64E19cny4bkocY/exec";
// Url for face log google sheet
//const facelogsheetUrl = "https://spreadsheets.google.com/feeds/cells/1f2zLWOWivY_L72VW0odfmGGeF4wxve1D6o4VvQm2Spg/1/public/values?alt=json-in-script&callback=doData";
const facelogsheetUrl = "https://spreadsheets.google.com/feeds/cells/1BkNHlFBWNXDSDD-jMM_BWSYjLNenLVKGW9cY7Mtnkzg/1/public/values?alt=json-in-script&callback=doData";
// Url for face models
const modelsUrl = "https://tunchz.github.io/Face.Rex/models";
// Url for trained face descriptor used to label known faces
const facedescriptorUrl = "https://tunchz.github.io/Face.Rex/descriptors/descriptor_withID.json";
// Load face labels list & profile image
let facestoverifyList = [];
const facelabels = loadcsvtoarray('https://tunchz.github.io/Face.Rex/descriptors/LabeledFaceImageProfiles3.csv');
//console.log(facelabels);

//var camIP = "10.90.0.98:8080";// "192.168.1.11:8080";
var image_src;

d3.select('#table-container').append('table').attr("id","table_image");
var summarysheetResults = [];


//const videocontainer = document.getElementById('video-container');
var ipcamUse = !true;
const isonMobile = onMobile();
if (isonMobile) {
  detectionloopDelay = 2*detectionloopDelay;
  num_keep = Math.ceil(verifyingPeriod/detectionloopDelay);
  ipcamUse = false;
}

const videocontainer = document.getElementById('video-container');
const canvas = document.getElementById('canvas');
var video,notification;
/*
if (ipcamUse) {
//const video = document.getElementById('video');
//const image_src = video.src.replace("video","shot.jpg");
  video = document.createElement("img");
  video.id = "video";
  video.width = "640";
  video.height = "480";
  video.src= "http://192.168.1.11:8080/video";
  video.alt= "Video feed";
  videocontainer.append(video);
  var image_src = video.src.replace("video","shot.jpg");
} else {
  video = document.createElement("video");
  video.id = "video";
  //video.width = "640";
  //video.height = "480";
  video.style.backgroundColor = "#000";
  video.autoplay = true;
  //video.muted = true;
  //video.setAttribute('muted', 'muted');
  videocontainer.append(video);
  resizeAdjust();
}
*/

// Initialize vidio element
video = document.createElement("img");
video.id = "video";
video.style.backgroundColor = "#000";
video.autoplay = true;
videocontainer.append(video);
resizeAdjust();
displaynoti("Loading models...");

startMap();
//inputMenu();

let faceMatcher;
let detectedfaces = [];
let detectedfacesList = [];
let sendingList = [];
let lat = 0,long = 0,loc;
const croppadding = 0.2;  // padding factor

// crossfilter variable
var dl,fl,List_filtered;

var formatDate = d3.time.format("%d/%m/%Y");  //("%d %B %Y %H:%M:%S");
var formatTime = d3.time.format("%H:%M");     //("%H:%M:%S");
var formatTimeDisplay = d3.time.format("%H:%M:%S");
var formatDayDisplay = d3.time.format("%d");
var formatMonthDisplay = d3.time.format("%B");
var filterDate = formatDate(new Date());
var filterVerification = "verified";
var filterDept = "All";

// Load face log to create detectedfacesList
summarysheetLoad(facelogsheetUrl);

/**** Load all model needed for face ****/
if (ipcamUse) {
  Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri(modelsUrl),
    faceapi.nets.faceLandmark68Net.loadFromUri(modelsUrl),
    faceapi.nets.faceRecognitionNet.loadFromUri(modelsUrl),
    faceapi.nets.faceExpressionNet.loadFromUri(modelsUrl),
    faceapi.nets.ageGenderNet.loadFromUri(modelsUrl)
  ]).then(start) 
} else {
  Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri(modelsUrl),
    faceapi.nets.faceLandmark68Net.loadFromUri(modelsUrl),
    faceapi.nets.faceRecognitionNet.loadFromUri(modelsUrl),
    faceapi.nets.faceExpressionNet.loadFromUri(modelsUrl),
    faceapi.nets.ageGenderNet.loadFromUri(modelsUrl)
  ]).then(pre_start) //then(start) 
}



function startVideo(webcam) {
/*
  if (!videoStart) {
    video.remove();
    console.log("start video....");
    video = document.createElement("video");
    video.id = "video";
    video.style.backgroundColor = "#000";
    //video.width = "640";
    //video.height = "480";
    video.autoplay = true;
    //video.muted = true;
    //video.setAttribute('muted', 'muted');
    videocontainer.append(video);
    resizeAdjust();

  }
*/
  if (webcam) {
    video.remove();
    video = document.createElement("video");
    video.id = "video";
    video.style.backgroundColor = "#000";
    video.autoplay = true;
    videocontainer.append(video);
    resizeAdjust();
    ipcamUse = false;

    console.log("WebCam");
    displaynoti("Retrieving video...");

    /*
    navigator.getUserMedia(
      { video: {} },  //{ video: {width:640, height:480} },
      stream => {
        video.srcObject = stream;
        videoStart = true;
        controlButton();
        resizeAdjust();
        video.muted = true;
        displaynoti("");
        console.log("video started...")
      },
      err => {
        //alert("error loading video >> please allow access to the video source...")
        displaynoti("Can't access video source!<br><red><small>click to return</small></red>");
        //inputMenu();
      } //console.error(err)
    )
    */
    switchCam(false);

  } else {
    //ipcamInit();
    inputIP();
  }

}



// get latitude and longitude
navigator.geolocation.getCurrentPosition(function(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;

  //latText.innerText = lat.toFixed(2);
  //longText.innerText = long.toFixed(2);
  //console.log(lat,long)

  // detect location
  loc = "MACS Dept";

});


function resizeAdjust() {
  //console.log($("#video-container").width(),$("#video-container").height())

  if($("#wholecontent").width() < 768){
    //console.log("<768")

    //$("#left-panel").height(($("#video-container").width())*3.1/4+100);
    if (isonMobile & !ipcamUse) {
      video.width = "480";
      video.height = "640";
      canvas.width = "480";
      canvas.height = "640";
      //$("#left-panel").height(($("#video-container").width()-150)*4/3+20+75);
      $("#left-panel").height(($("#video-container").width()-50)*4/3+20+75);
      $("#video-container").height(($("#video-container").width()-50)*4/3+20);
      $("#video").width(($("#video-container").width()-50));
      $("#video").height(($("#video-container").width()-50)*4/3);
      $("#canvas").width(($("#video-container").width()-50));
      $("#canvas").height(($("#video-container").width()-50)*4/3);


    } else {
      video.width = "640";
      video.height = "480";
      canvas.width = "640";
      canvas.height = "480";      
      $("#left-panel").height(($("#video-container").width())*3/4+75);
      $("#video-container").height(($("#video-container").width())*3/4);
      $("#video").width(($("#video-container").width()-40));
      $("#video").height(($("#video-container").width()-40)*3/4);
      $("#canvas").width(($("#video-container").width()-40));
      $("#canvas").height(($("#video-container").width()-40)*3/4);
    }

  } else {
    video.width = "640";
    video.height = "480";
    canvas.width = "640";
    canvas.height = "480";
    $("#left-panel").height($("#wholecontent").height());
    $("#video-container").height($("#wholecontent").height()*0.875);
    $("#video").width(($("#video-container").width()-40));
    $("#video").height(($("#video-container").width()-40)*3/4);
    $("#canvas").width(($("#video-container").width()-40));
    $("#canvas").height(($("#video-container").width()-40)*3/4);

  }

  displaySize = { width: video.width, height: video.height };

}

function onMobile() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

/**** add event listener to precess when video plays ****/
video.addEventListener('play',() => {
  //console.log("videp play...")
  start();
})

var detections,resizedDetections,results;


function pre_start() {
  //startVideo();
  firstRun();
  videoStart = false;
  //displaynoti("Loading models...");
  start();
}

async function firstRun() {
  console.log("1st Run...")
  // Using all models for first time to 
  const labeledFaceDescriptors = await loadLabeledDescriptor(facedescriptorUrl); //console.log(labeledFaceDescriptors);
  faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, facematcherThreshold);
  try {
    image = await faceapi.fetchImage("https://tunchz.github.io/Face.Rex/labeled_images/Tunchz/2.jpg");
  }
  catch(err) {
    alert("error fetching image for 1st-run testing >> please check the connection...");
  }
  detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors().withFaceExpressions().withAgeAndGender();;
  resizedDetections = faceapi.resizeResults(detections, { width: 320, height: 240 });
  results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor));    
  videoStart = false;

  //--------------------------------------------------------------------------------------------------
  //inputMenu();
}


async function start() {
  
  /**** define display size and format canvas size to match ****/
  displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  canvas_ctx = canvas.getContext('2d');

  /****Detect face and recognize for every detectionDelay milliseconds ****/
  //console.log("loop start!")
  setInterval(async () => {
    loop_i++;

    console.log(loop_i,videoStart);

    if (videoStart) {
      detect();
    } else { 
      canvas_ctx.clearRect(0, 0, canvas.width, canvas.height);
      var timenow = new Date();
      var numfaces = detectedfaces.length 
      //canvas_ctx.lineWidth = "12";
      //canvas_ctx.strokeStyle = "#00f";
      //canvas_ctx.rect(canvas.width - 80, 6, 80, 12);
      canvas_ctx.font = "20px Impact";
      canvas_ctx.fillStyle = "#fff";
      canvas_ctx.fillText(" "+formatTimeDisplay(timenow)+" ", canvas.width - 80, 20);
    }


    // Check loops to update detectedfacesList from google sheet
    if (loop_i>looptoUpdate-1) {
      uploadsendingfailList();
      summarysheetLoad(facelogsheetUrl);
      loop_i = 0;
    }

    async function detect() {

      /**** Detect face ▶ find face landmark ▶ predict agaist face descriptor ▶ predict face expression ▶ predict age&gender****/
    
      if (ipcamUse) {
        try {
          image = await faceapi.fetchImage(image_src);
        }
        catch(err) {
          //alert("error playing video for ip camera >> please check the connection...");
          videoStart = false;
          displaynoti("Can't retrieve video source! check your connection.<br><red><small>click to return</small></red>");
        }
        //image = await faceapi.fetchImage(image_src);
        resizedDetections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors().withFaceExpressions().withAgeAndGender();

      } else {
        detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors().withFaceExpressions().withAgeAndGender();

        /****Resize the result of detection matching the display size ****/
        resizedDetections = faceapi.resizeResults(detections, displaySize);
      }

      /**** Match the faces detected with the descriptor ****/
      results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor));

      /**** Clear the previous overlay draw on the canvas ****/
      //canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

      canvas_ctx.clearRect(0, 0, canvas.width, canvas.height);


      var timenow = new Date();
      var numfaces = detectedfaces.length;

   
      canvas_ctx.lineWidth = "12";
      canvas_ctx.strokeStyle = "#000";
      canvas_ctx.globalAlpha = 0.2;
      canvas_ctx.rect(canvas.width - 80, 6, 80, 12);
      canvas_ctx.stroke();
      canvas_ctx.globalAlpha = 1;
      canvas_ctx.font = "20px Impact";
      canvas_ctx.fillStyle = "#fff";
      canvas_ctx.fillText(" "+formatTimeDisplay(timenow)+" ", canvas.width - 80, 20);

      results.forEach((result, i) => {

        /**** extract age gender emotion from result ****/
        const age = resizedDetections[i].age;
        var gender;
        if (resizedDetections[i].gender = 'male') {
          gender = "♂ ชาย";
        } else {
          gender = "♁ หญิง";
        }
        const expressions = resizedDetections[i].expressions;
        const maxValue = Math.max(...Object.values(expressions));
        const emotion = Object.keys(expressions).filter(item => expressions[item] === maxValue);



        /**** record detected faces to verify ****/
        var facefound,verified = false;
        var progress = 0;

        /**** get bounding box on face ****/
        const box = resizedDetections[i].detection.box;

        if (numfaces > 0) {
          for (j=0 ; j< numfaces ; j++) {
            if (detectedfaces[j].label == result.label) {
              facefound = true;
              if (detectedfaces[j].datetime.length > num_keep-1) {
                detectedfaces[j].datetime.shift();
                verified = true;
              } else if (detectedfaces[j].datetime.length == num_keep-1) {
                // 1st time verified : capture face image & add face to detectedfacesList

                var base64data = '';
                var canvascropped = document.createElement("canvas");
                var ctx = canvascropped.getContext("2d");

                canvascropped.width = box.height*(1+3*croppadding);//box.width*(1+2*croppadding);
                canvascropped.height = box.height*(1+3*croppadding);
                


                if (ipcamUse) {
                  const box_ = detections[i].detection.box;
                  ctx.drawImage(image, box_.x+box_.width/2-box_.height*(0.5+1.4*croppadding), box_.y-box_.height*2*croppadding, 
                               box_.height*(1+3*croppadding), box_.height*(1+3*croppadding), 0, 0,  box_.height*(1+3*croppadding), box_.height*(1+3*croppadding));
                } else {
                  ctx.drawImage(video, box.x+box.width/2-box.height*(0.5+1.5*croppadding), box.y-box.height*2*croppadding, 
                               box.height*(1+3*croppadding), box.height*(1+3*croppadding), 0, 0,  box.height*(1+3*croppadding), box.height*(1+3*croppadding));
                }

                base64data = canvascropped.toDataURL("image/jpeg");
                //console.log(base64data);

                detectedfacelistAdd(detectedfaces[j], emotion[0], base64data);

              }
              detectedfaces[j].datetime.push(1);   
              progress = detectedfaces[j].datetime.length;
              detectedfaces[j].last = timenow;
            } 
          }


          if (!facefound) {
            detectedfaces.push({  
                                'label'     : result.label,
                                'datetime'  : [1],
                                'last'      : timenow,
                                'time_missed': 0
            });
            progress = 1;
          }
        } else {
          detectedfaces.push({  
                              'label'     : result.label,
                              'datetime'  : [1],
                              'last'      : timenow,
                              'time_missed': 0
          });
          progress = 1;
        }


        
        /**** draw box wiht label ****/
        if (result.label == "unknown") {
          bcolor = 'rgba(255, 0, 0, 1)';
        } else if (verified) {
          bcolor = '#9bee00';
          //display profile image top-left
          //canvas.getContext("2d").drawImage(labelimg[parseInt(result.label)], box.x-labelimg[parseInt(result.label)].width, box.y-20);
          //display profile image bottom-left
          var w = facelabels[parseInt(result.label)].img.width/2,h = facelabels[parseInt(result.label)].img.height/2;

          canvas.getContext("2d").drawImage(facelabels[parseInt(result.label)].img, box.x+2, box.y+box.height-h/*facelabels[parseInt(result.label)].img.height*/-2,w,h);
        } else {
          bcolor = 'rgba(255, 100, 0, 1)';
        }

        const drawBox = new faceapi.draw.DrawBox(box, { label: " "+ (result.label == "unknown" ? "unknown": facelabels[parseInt(result.label)].name) + " "/* + " : " + Math.round(interpolatedAge) + gender +" ▷ "+ emotion*/,
                                                      lineWidth: 2, boxColor: bcolor, drawLabelOptions: {fontSize: 13, fontColor :'rgba(0, 0, 0, 1)'}})
        drawBox.draw(canvas);
        const text = new faceapi.draw.DrawTextField([" "+ Math.round(age) + gender +" ▸ Mood : "+ emotion],{ x: box.x, y: box.y+box.height}, 
                                                      {anchorPosition: 'TOP_LEFT', backgroundColor : 'rgba(0, 0, 0, 0 )', fontColor : 'rgba(255, 255, 255, 1 )',
                                                      fontSize : 10, padding : 2});
        text.draw(canvas);

        // draw verifying progress bar
        if (!verified & result.label != "unknown") {
          const progressBar = new faceapi.draw.DrawBox({ x: box.x+4, y: box.y+box.height-6, width: (box.width-8)/num_keep*progress, height: 2 },
                                                        {lineWidth: 2, boxColor:'rgba(255, 100, 0, 1)'/*, drawLabelOptions: {fontSize: 8}*/});
          progressBar.draw(canvas);
          const text = new faceapi.draw.DrawTextField(["verifying progress..."],{ x: box.x+4, y: box.y+box.height-23}, 
                                                        {anchorPosition: 'TOP_LEFT', backgroundColor : 'rgba(0, 0, 0, 0 )', fontColor : 'rgba(255, 255, 255, 1 )',
                                                        fontSize : 10, padding : 2});
          text.draw(canvas);
        }

      })

      /**** Remove expired faces from detected faces ****/
      numfaces = detectedfaces.length;
      for (j=0 ; j < numfaces ; j++) {
        var timemissed = timenow.getTime() - detectedfaces[0].last.getTime();
        if (detectedfaces[0].datetime.length > num_keep-1) {
          //compensate time for verified face for timetokeepverifiedfaces  except "unknown" face
          if (detectedfaces[0].label != "unknown") {
            timemissed = timemissed - timetokeepverifiedfaces + missedDuration;
          }
        } else if (timemissed > 0) {
          detectedfaces[0].datetime.shift();
        }
            //console.log(timemissed);
        if (timemissed < missedDuration) {
          detectedfaces[0].time_missed = timemissed;
          var facerec = detectedfaces[0];
          detectedfaces.push(facerec);
        
        }
        detectedfaces.shift();
      }


    }    

  }, detectionloopDelay)


  
}// function Start()



function detectedfacelistAdd(facerec, mood, imgdata) {

  const sendingRec = {  
                          'id'        : facerec.label,
                          'date'      : formatDate(facerec.last),
                          'timein'    : formatTime(facerec.last),
                          'mood'      : mood,
                          'location'  : loc,
                          'lat'       : lat,
                          'lon'       : long,
                          'img'       : imgdata,
                          'status'    : "sending",
                          'dept'      : facerec.label == 'unknown' ? "" : facestoverifyList[parseInt(facerec.label)].last,
                          'verified'  : facerec.label == 'unknown' ? "unknown" : "verified"
  };

  const serializedData = "id=" + sendingRec.id
                        +"&date="+ sendingRec.date
                        +"&timein="+ sendingRec.timein
                        +"&mood="+ sendingRec.mood
                        +"&location="+ sendingRec.location
                        +"&lat="+ sendingRec.lat
                        +"&lon="+ sendingRec.lon
                        +"&img="+ sendingRec.img;

  // send request to insert face record to the target sheet
  request = $.ajax({
    url: sheetUrl, 
    type: "post",
    data: serializedData
  });

  // callback handler that will be called on success
  request.done(function (response, textStatus, jqXHR){
    sendingRec.status = sendingRec.id=="unknown"?"unknown":"succeeded";
    addtoList();
    //sendingList.shift();
    //console.log("Sending succeeded.",detectedfacesList,"unsent : "+sendingList.length);

  });

  // callback handler that will be called on failure
  request.fail(function (jqXHR, textStatus, errorThrown){
    sendingRec.status = "failed";
    sendingList.push(sendingRec);
    addtoList();
    console.error("The following error occured: "+ textStatus, errorThrown);

  });



  function addtoList() {
    // add new detected face into detectedfacesList if not exist
    var faceinlist = false;
    if (sendingRec.id != 'unknown') {
      for (k=0; k<detectedfacesList.length; k++) {
        if (detectedfacesList[k].id == sendingRec.id & detectedfacesList[k].date == sendingRec.date) {
          faceinlist = true;
          // Update no. of detection, last seen, mood, image
          detectedfacesList[k].detection++;
          detectedfacesList[k].last = formatTime(facerec.last);
          detectedfacesList[k].timestamp = facerec.last;
          detectedfacesList[k].mood = mood;
          detectedfacesList[k].img = imgdata;
          //update detection number in the Table
          //document.getElementById('subtag-'+(detectedfacesList.length-k-1)+'-1').innerHTML = detectedfacesList[k].detection;
          //console.log("update",detectedfacesList);
          updateTable();
        }
      }
    }
    
    if (!faceinlist) {
      detectedfacesList.push(sendingRec);
      detectedfacesList[detectedfacesList.length-1].detection = 1;
      detectedfacesList[detectedfacesList.length-1].last = formatTime(facerec.last);
      detectedfacesList[detectedfacesList.length-1].timestamp = facerec.last;
      if (sendingRec.id == 'unknown') {
        detectedfacesList[detectedfacesList.length-1].mood = "";
      }
      //console.log("add",detectedfacesList);
      updateTable();  

    }

  }
}


function uploadsendingfailList() {
  for (f=0;f<sendingList.length;f++) {

    const serializedData = "id=" + sendingList[0].id
                          +"&date="+ sendingList[0].date
                          +"&timein="+ sendingList[0].timein
                          +"&mood="+ sendingList[0].mood
                          +"&location="+ sendingList[0].location
                          +"&lat="+ sendingList[0].lat
                          +"&lon="+ sendingList[0].lon
                          +"&img="+ sendingList[0].img;

    // send request to insert face record to the target sheet
    request = $.ajax({
      url: sheetUrl, 
      type: "post",
      data: serializedData
    });

    // callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
      sendingList.shift();
      //console.log("Sending succeeded.",detectedfacesList,"unsent : "+sendingList.length);

    });

    // callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
      console.error("The following error occured: "+ textStatus, errorThrown);
      var rec = sendingList[0];
      sendingList.push(rec);
      sendingList.shift();
    });

  }
  //updateTable();
}

function summarysheetLoad(url) {

  console.log("update summary sheet start at "+formatTime(new Date()));
  // Create JSONP Request to Google Docs API, then execute the callback function doData
  $.ajax({
      url: url,
      jsonp: 'doData',
      dataType: 'jsonp'
  });

}


// The callback function the JSONP request will execute to load data from API
function doData(data) {
  var entries = data.feed.entry;
  var previousRow = 0;
  summarysheetResults = [];
  for (var i = 0; i < entries.length; i++) {
      var latestRow = summarysheetResults[summarysheetResults.length - 1];
      var cell = entries[i];
      var text = cell.content.$t;
      var row = cell.gs$cell.row;
      if (row > previousRow) {
          var newRow = [];
          newRow.push(text);
          summarysheetResults.push(newRow);
          previousRow++;
      } else {
          latestRow.push(text);
      }
  }
  handleResults(summarysheetResults);
  console.log("update summary sheet finished at "+ formatTime(new Date()));
}

// Handle array recieved from face log sheet to store in detectedfacesList
function handleResults(spreadsheetArray) {
  var facesList = [], inlist = false;

  //console.log(spreadsheetArray);
  //for (r=1; r<spreadsheetArray.length; r++) {
  for (r=spreadsheetArray.length-1; r>0; r--) {
    inlist = false;
    for (s=0; s<facesList.length; s++) {
      if (spreadsheetArray[r][1] == facesList[s].id & spreadsheetArray[r][2] == facesList[s].date & spreadsheetArray[r][1] != "unknown") {
        inlist = true;
        facesList[s].detection++;
        facesList[s].timein = spreadsheetArray[r][3];
      }
    }
    //console.log(r,inlist);
    if (!inlist) {
      var d = spreadsheetArray[r][2].split('/'); //split date to reconstruct timestamp later on
      facesList./*push*/unshift({  
                      'id'        : spreadsheetArray[r][1],
                      'date'      : spreadsheetArray[r][2],
                      'timein'    : spreadsheetArray[r][3],
                      'last'      : spreadsheetArray[r][3],
                      'mood'      : spreadsheetArray[r][1]=="unknown"?"":spreadsheetArray[r][4],
                      'location'  : spreadsheetArray[r][5],
                      'lat'       : spreadsheetArray[r][6],
                      'lon'       : spreadsheetArray[r][7],
                      'img'       : typeof spreadsheetArray[r][8]!='undefined'? spreadsheetArray[r][8].replace(/\s/g, "+"):spreadsheetArray[r][1]=="unknown"?"https://tunchz.github.io/Face.Rex.MACS/img/unknown_small.jpg":facelabels[parseInt(spreadsheetArray[r][1])].img.src, //if no image, use profile image
                      'status'    : spreadsheetArray[r][1]=="unknown"?"unknown":"succeeded",
                      'dept'      : spreadsheetArray[r][1]=="unknown"?"":facestoverifyList[parseInt(spreadsheetArray[r][1])].last,
                      'verified'  : spreadsheetArray[r][1]=="unknown"?"unknown":"verified",
                      'timestamp' : new Date(d[2]+'-'+d[1]+'-'+d[0]+' '+spreadsheetArray[r][3]+':00'),
                      'detection' : 1
      });      
    }
  }

  detectedfacesList = facesList;
  //console.log(detectedfacesList);

 //displayTable();
 updateTable();
  
}



function updateTable() {
  // remove table
  // first time there is no table to remove
  //if (loop_i !=0) {
    var removetable = document.getElementById('table_image');
    removetable.parentElement.removeChild(removetable);    
  //}

  displayTable();

}


function displayTable() {
  // Initialize crossfilter variable for detectedfacesList
  dl = crossfilter(detectedfacesList);
  dl.date = dl.dimension(function(d) { return d.date; });
  dl.timestamp = dl.dimension(function(d) { return d.timestamp; });
  dl.id = dl.dimension(function(d) { return d.id; });
  dl.verified = dl.dimension(function(d) { return d.verified; });
  dl.dept = dl.dimension(function(d) { return d.dept; });

  // clear previous verification filter
  dl.verified.filterAll();

  // filter by selected date
  dl.date.filterExact(filterDate/*"21/07/2020"*/)

  // count all detected faces and unknown faces
  var totaldetected = dl.id.top(Infinity).length;
  var unknown = dl.id.filterExact("unknown").top(Infinity).length;
  totaldetected = totaldetected - unknown;

  // clear id filter
  dl.id.filterAll();

  // sync verified face from detectedfacesList to facestoverifyList
   for (s=0; s<facestoverifyList.length; s++) {
    facestoverifyList[s].verified = "nonverified";
  }
  List_filtered = dl.verified.filterExact("verified").top(Infinity); 
  for (s=0; s<List_filtered.length; s++) {
    facestoverifyList[parseInt(List_filtered[s].id)].verified = "verified";
  }

  // Initialize crossfilter variable for facestoverifyList
  fl = crossfilter(facestoverifyList);
  fl.verified = fl.dimension(function(d) { return d.verified; });
  fl.dept = fl.dimension(function(d) { return d.last; });
  fl.id = fl.dimension(function(d) { return parseInt(d.id); });
  fl.verified.filterExact("nonverified") 

  // filter dept from selected filter menu and count number of id that has not been verified
  if (filterDept == "All") {
    fl.dept.filterAll();
  } else {
    fl.dept.filterExact(filterDept);
  }
  var totaltoverified = fl.id.top(Infinity).length;

  // filter verified faces and dept from selected filter menu 
  // to count number of id that has been verified and total detection
  dl.verified.filterExact("verified");
  if (filterDept == "All") {
    dl.dept.filterAll();
  } else {
    dl.dept.filterExact(filterDept);
  }   
  List_filtered = dl.id.top(Infinity);
  var totalverified = List_filtered.length;
  var detection = 0;
  for (t=0;t<List_filtered.length;t++) {
    detection = detection + List_filtered[t].detection;
    //console.log(detection,parseInt(List_filtered[t].detection));
  }

  // Check the filter value to assign the correct list for unknown
  // unknown list have no dept, neet to clear dept filter
  if (filterVerification == "unknown") { 
    dl.dept.filterAll();
    dl.verified.filterExact("unknown");    
    List_filtered = dl.id.top(Infinity);
  }

  // Assign to correct list for filter verification status to update table
  if (filterVerification == "nonverified") {
    List_filtered = fl.id.bottom(Infinity);
  } else {
    List_filtered = dl.timestamp.top(Infinity);
  }


  // Update Stats
  document.getElementById("total-detectedfaces").innerHTML = totaldetected;
  document.getElementById("total-verified").innerHTML = totalverified;
  document.getElementById("total-status").innerHTML = sendingList.length != 0? sendingList.length+" failed" :(isonMobile ? "Mobile" : "Desktop");
  document.getElementById("total-tobeverified").innerHTML = totaltoverified;
  document.getElementById("total-detection").innerHTML = detection;//+' ครั้ง';
  document.getElementById("total-unknown").innerHTML = unknown;
  document.getElementById("daydisplay").innerHTML = formatDayDisplay($('#datepicker').datepicker('getDate'));
  document.getElementById("monthdisplay").innerHTML = formatMonthDisplay($('#datepicker').datepicker('getDate'));
  //console.log(filterDate,formatDateDisplay($('#datepicker').datepicker('getDate')));


  //console.log(detectedfacesList.length,List_filtered.length)

  // Create Table
  tabulateimg(List_filtered, ["img","id","dept","date","timein","last","mood","status","detection"]); 
  drawmap(dl.timestamp.top(Infinity))
}


function multivalue_filter(values) {
    return function(v) {
        return values.indexOf(v) !== -1;
    };
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


function loadcsvtoarray(filename) {
  var arr = null;
  var labels = [];
  $.ajax({
    async: false,
    url: filename,
    dataType: "text",
    success: function (data) {
      arr = csv2array(data); //console.log(arr);
    }
  });
  for (i = 1; i < 50/*arr.length*/; i++) {
    var mini_img = new Image(); 
    mini_img.src = 'data:image/jpeg;base64,'+arr[i][2];//.replace(/\s/g, "+");
    mini_img.id = 'thumbnail';
    labels.push({"name" : arr[i][1],"img" : mini_img});
    //console.log(i);

    facestoverifyList.push({  
                    'id'        : arr[i][0],
                    'date'      : " ",
                    'timein'    : arr[i][3],
                    'last'      : arr[i][3],
                    'mood'      : " ",
                    'location'  : " ",
                    'lat'       : " ",
                    'lon'       : " ",
                    'img'       : mini_img.src,
                    'status'    : "toverify",
                    'dept'      : arr[i][4],
                    'verified'  : "nonverified",
                    'timestamp' : " ",
                    'detection' : " "
    }); 

  }

  // Initialize() needs facetoverifyList to be loaded completely
  Initialize();

  return labels;

}

function csv2array(strData, strDelimiter) {
    strDelimiter = (strDelimiter || ",");
    var objPattern = new RegExp((
    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
    "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    var arrData = [[]];
    var arrMatches = null;
    while (arrMatches = objPattern.exec(strData)) {
        var strMatchedDelimiter = arrMatches[1];
        if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
            arrData.push([]);
        }
       if (arrMatches[2]) {
           var strMatchedValue = arrMatches[2].replace(
            new RegExp("\"\"", "g"), "\"");
        } else {
           var strMatchedValue = arrMatches[3];
        }
       arrData[arrData.length - 1].push(strMatchedValue);
    }
    return (arrData);
}

function updateMenu(menuNum) {
  document.getElementById("menuIndicator1").style.backgroundColor = "#fff0";
  document.getElementById("menuIndicator2").style.backgroundColor = "#fff0";
  document.getElementById("menuIndicator3").style.backgroundColor = "#fff0";
  if (menuNum == 1) {
    //console.log('click verified');
    document.getElementById("menuIndicator1").style.backgroundColor = "#9bee00";
    document.getElementById("menu-container").style.borderBottom = "2px solid #9bee00";
    filterVerification = "verified";
    updateTable();
  } else if (menuNum == 2) {
    //console.log('click non-verified');
    document.getElementById("menuIndicator2").style.backgroundColor = "#fcc400";
    document.getElementById("menu-container").style.borderBottom = "2px solid #fcc400";
    filterVerification = "nonverified";
    updateTable();
  } else {
    //console.log('click unknown');
    document.getElementById("menuIndicator3").style.backgroundColor = "#ff0000";
    document.getElementById("menu-container").style.borderBottom = "2px solid #ff0000";
    filterVerification = "unknown";
    updateTable();
  }
}

function Initialize() {

  const ONE_HOUR = 60 * 60 * 1000,
        ONE_DAY = 24 * ONE_HOUR;
  var today = new Date();//Date('2020-05-18T17:59:06.134Z');

  // Retrieve department list from facestoverifyList
  fl = crossfilter(facestoverifyList);
  fl.dept = fl.dimension(function(d) { return d.last; });
  fl_dept = fl.dept.group().reduceCount().top(Infinity);

  var dept = [{"dept" : "All", "num" : facestoverifyList.length}]
  for (s = 0; s < fl_dept.length;s++) {
    dept.push({ 
      "dept" : fl_dept[s].key,
      "num"  : fl_dept[s].value
    });
  }
  //console.log(dept);

  //var dept = [{"dept" : "All", "num" : 49},{"dept" : "MACS", "num" : 32},{"dept" : "MHL", "num" : 11},{"dept" : "Tunchz Family", "num" : 6}];

  // add the options to the button
  d3.select("#dept-selector")
    .selectAll('myOptions')
    .data(dept)
    .enter()
    .append('option')
    .text(function (d) { return d.dept+"   ("+d.num+")"; }) // text showed in the menu
    .attr("value", function (d) { return d.dept; }) // corresponding value returned by the button

  d3.select("#dept-selector").on("change", function(d) {
      filterDept = d3.select(this).property("value");
      updateTable();
  })


  $('#datepicker').datepicker({
    format: 'dd/mm/yy',
    autoclose: true,
    //todayBtn: "linked",
    todayHighlight: true
    
  });

  $('#datepicker').datepicker('setDate', today);

  $('#datepicker').on('changeDate', function () {
    filterDate = formatDate($('#datepicker').datepicker('getDate'));
    updateTable();
  });

  $('#today-button').click(function() {
    $('#datepicker').datepicker('setDate', today);
    filterDate = formatDate($('#datepicker').datepicker('getDate'));
    updateTable();
  });

  $('#left-button').click(function() {
    $('#datepicker').datepicker('setDate', new Date(($('#datepicker').datepicker('getDate')).getTime() - ONE_DAY));
    filterDate = formatDate($('#datepicker').datepicker('getDate'));
    updateTable();
  });

  $('#right-button').click(function() {
    if (formatDate($('#datepicker').datepicker('getDate')) != formatDate(new Date())) {
      $('#datepicker').datepicker('setDate', new Date(($('#datepicker').datepicker('getDate')).getTime() + ONE_DAY));
      filterDate = formatDate($('#datepicker').datepicker('getDate'));
      updateTable();
    }
  });


  // Detect if orientation changes on mobile
  window.addEventListener("orientationchange", function() {
    resizeAdjust();
  }, false);

}

/*
function loadlabelimage(filelink,iter,max) {
  var data = '';
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var img = new Image();



  img.onload = function () {
      const w = img.width*40/img.height, h = 40;
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      //console.log(canvas.width,canvas.height);
      data = canvas.toDataURL("image/jpeg");
      //labelimg.push(data);
      labelimg[iter] = new Image();
      labelimg[iter].src = data;
      //console.log(iter,labelimg[iter]);
      iter++;
      if (iter<max) {
        loadlabelimage("https://tunchz.github.io/Face.Rex/labeled_images_2",iter,max);
      }
  };
  img.crossOrigin = 'Anonymous';
  img.src = filelink+"/"+iter+"/1.jpg";
}

*/


// stop both mic and camera
function stopVideo(stream) {
    try {
      /*
      video.srcObject.getTracks().forEach(function(track) {
        if (track.readyState == 'live') {
          track.stop();
        }
      });
      */
      video.srcObject.getTracks().forEach(track => {
        track.stop();
      });
    } catch(err) {}

  videoStart = false;  
  inputMenu();
}

// stop only camera
function stopVideoOnly(stream) {
  stream.getTracks().forEach(function(track) {
    if (track.readyState == 'live' && track.kind === 'video') {
      track.stop();
    }
  });
}

// stop only mic
function stopAudioOnly(stream) {
  stream.getTracks().forEach(function(track) {
    if (track.readyState == 'live' && track.kind === 'audio') {
      track.stop();
    }
  });
}

function displaynoti(text) {
  try {
    notification.remove();
  }
  catch(err) {}
  if (text != "") {
    notification = document.createElement("button");
    notification.id = "noti";
    notification.className = "noti btn";
    notification.width = "20%";
    notification.height = "10%";
    notification.setAttribute('onclick', 'inputMenu()');
    videocontainer.append(notification);
    document.getElementById("noti").innerHTML = text;

  }
}

function inputMenu() {
  console.log("Input Menu");

  // hide map and show video container for menu
  document.getElementById("map-container").style.display = "none";
  document.getElementById("video-container").style.display = "flex";

  // remove remaining notification
  try {
    notification.remove();
  } catch(err) {}    

  try { 
  video.remove();
  video = document.createElement("img");
  video.id = "video";
  video.style.backgroundColor = "#000";
  video.autoplay = true;
  videocontainer.append(video);
  resizeAdjust();
  } catch(err) {}

  // remove existing stop-button
  try {
    document.getElementById("switch-button").remove();
  } catch(err) {}     
  try {
    document.getElementById("stop-button").remove();
  } catch(err) {}  

  // Menu Blackground Container
  notification = document.createElement("div");
  notification.id = "noti";
  notification.className = "noti";
  notification.style.backgroundColor = "#000";
  if (isonMobile) {
    notification.width = "27%";
    notification.height = "9%";
  } else {
    notification.width = "30%";
    notification.height = "10%";    
  }
  videocontainer.append(notification);

  // Map Button
  const mapbt = new Image();
  mapbt.id = "mapbt";
  mapbt.className = "button-img";
  mapbt.src = "img/MAP_icon.png";
  mapbt.setAttribute('type', 'button');
  mapbt.setAttribute('onclick', 'startMap()');
  notification.append(mapbt);

  // Webcam Button
  const webcam = new Image();
  webcam.id = "webcam";
  webcam.className = "button-img";
  webcam.src = "img/WebCam_icon.png";
  webcam.setAttribute('type', 'button');
  webcam.setAttribute('onclick', 'startVideo(true)');
  notification.append(webcam);

  // CCTV Button
  const cctv = new Image();
  cctv.id = "cctv";
  cctv.className = "button-img";
  cctv.src = "img/CCTV_icon.png";
  cctv.setAttribute('onclick', 'startVideo(false)');
  notification.append(cctv);
  
}

function controlButton() {
  // remove existing stop-button
  try {
    document.getElementById("switch-button").remove();
  } catch(err) {}     
  try {
    document.getElementById("stop-button").remove();
  } catch(err) {}  

  //Camera switch
  if (isonMobile) {
    const switchbtn = document.createElement("button");
    switchbtn.id = "switch-button";
    switchbtn.className = "btn btn-default button-control";
    switchbtn.style.padding = "0px 10px";
    switchbtn.setAttribute('type', 'button');
    switchbtn.setAttribute('onclick', 'switchCam(true)');
    document.getElementById("select-container").append(switchbtn);
    document.getElementById("switch-button").innerHTML = "⟳";
  }

  //document.getElementById("stop-button").innerHTML = "■";
  const stopbtn = document.createElement("button");
  stopbtn.id = "stop-button";
  stopbtn.className = "btn btn-default button-control";
  stopbtn.style.padding = "0px 10px";
  stopbtn.setAttribute('type', 'button');
  stopbtn.setAttribute('onclick', 'stopVideo()');
  document.getElementById("select-container").append(stopbtn);
  document.getElementById("stop-button").innerHTML = "■";
}


async function ipcamInit(inputip) {
    video.remove();
    video = document.createElement("img");
    video.id = "video";
    video.style.backgroundColor = "#000";
    video.alt= "Video feed";
    videocontainer.append(video);
    resizeAdjust();
    ipcamUse = true;

    console.log("CCTV");
    displaynoti("Retrieving video from   "+ inputip);

    try {
      image_src = "http://"+inputip+"/shot.jpg";
      await faceapi.fetchImage(image_src);
      video.src= "http://"+inputip+"/video";
      controlButton();
      resizeAdjust();
      videoStart = true;
      displaynoti("");
      console.log("video started...");
    } 
    catch(err) {
      displaynoti("Can't access video source!<br><red><small>click to return</small></red>");
    }  


}

function inputIP() {
  displaynoti("");
  notification = document.createElement("div");
  notification.id = "noti";
  notification.className = "noti";
  notification.style.fontFamily = 'Serithai';
  notification.style.fontSize = '12px';
  videocontainer.append(notification);

  const form =  document.createElement("form");
  form.id = "ip-input";
  notification.append(form);
  document.getElementById("ip-input").innerHTML = '<label for="ip">IP : </label><input id="ip" class = "btn-default" name="ip" type="text" value="" title="กรอก ip XXX.XXX.XXX.XXX:XXXX"/><input class = "btn btn-default" type="submit" value="Retrieve" />';
  console.log("submit");


  //var serializedData;


  $("#ip-input").submit(function(event){
/*    //console.log("ip is "+document.getElementById("ip").value);
    // setup some local variables
    var $form = $(this);
    // let's select and cache all the fields
    var $inputs = $form.find("input, select, button");
    serializedData = $form.serialize();
    $inputs.prop("disabled", true);
    ipcamInit(serializedData.replace(/%3A/g, ":").split("=")[1]);


    // prevent default posting of form
    event.preventDefault();
*/
    ipcamInit(document.getElementById("ip").value);
  });
}
/*
window.addEventListener("orientationchange", function() {
  //alert(window.orientation);
  if (isonMobile & !ipcamUse) {    
    try {
      video.srcObject.getTracks().forEach(function(track) {
        if (track.readyState == 'live') {
          track.stop();
        }
      });
    }
    catch(err) {
    }

  videoStart = false;  
  }

}, false);
*/

function switchCam(sw) {
  if (sw) {
    frontCam = !frontCam;
    console.log("switch camera!");
    try {
      /*
      video.srcObject.getTracks().forEach(function(track) {
        if (track.readyState == 'live') {
          track.stop();
        }
      });
      */
      video.srcObject.getTracks().forEach(track => {
        track.stop();
      });
    } catch(err) {}
    videoStart = false;  
  }
  
  if (isonMobile) {
    const videoConstraints = {};
    if (frontCam) {
      console.log("front camera"); 
      //videoConstraints.facingMode = 'user';
    } else {
      console.log("rear camera"); 
      videoConstraints.facingMode = 'environment';
    }
    const constraints = {
      video: videoConstraints,
      audio: false
    };
    
/*    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        currentStream = stream;
        video.srcObject = stream;
        return navigator.mediaDevices.enumerateDevices();
      })
      .then(gotDevices)
      .catch(error => {
        console.error(error);
    });
*/
    navigator.getUserMedia(
      constraints,//{ video: {} },  //{ video: {width:640, height:480} },
      stream => {
        video.srcObject = stream;
        videoStart = true;
        controlButton();
        resizeAdjust();
        video.muted = true;
        displaynoti("");
        console.log("video started...")
      },
      err => {
        //alert("error loading video >> please allow access to the video source...")
        controlButton();
        displaynoti("Can't access "+(frontCam?"front":"rear")+" camera!<br><red><small>click to return</small></red>");
        //inputMenu();
      } //console.error(err)
    )

  } else {
    // not on mobile
    navigator.getUserMedia(
      { video: {}, audio: false },  //{ video: {width:640, height:480} },
      stream => {
        video.srcObject = stream;
        videoStart = true;
        controlButton();
        resizeAdjust();
        video.muted = true;
        displaynoti("");
        console.log("video started...")
      },
      err => {
        //alert("error loading video >> please allow access to the video source...")
        displaynoti("Can't access video source!<br><red><small>click to return</small></red>");
        //inputMenu();
      } //console.error(err)
    )    
  }
}



function startMap() {

  //hide 
  document.getElementById("video-container").style.display = "none";
  document.getElementById("map-container").style.display = "block";
  map.resize();
  //document.getElementById("left-bottom").style.height = "87%";
  //document.getElementById("map-container").style.height = "98%";
  //document.getElementById("left-bottom").style.height = "88%";
  // $("#map-container").height($("#left-bottom").height()*0.98);
  // $("#map-container").width($("#left-bottom").width()*0.98);
  // $("#map").height($("#left-bottom").height()*0.98);
  // $("#map").width($("#left-bottom").width()*0.98);

  //$("#map-container").height($("#left-panel").height()*0.7);

/*
  if (webcam) {
    video.remove();
    video = document.createElement("video");
    video.id = "video";
    video.style.backgroundColor = "#000";
    video.autoplay = true;
    videocontainer.append(video);
    resizeAdjust();
    ipcamUse = false;

    console.log("WebCam");
    displaynoti("Retrieving video...");

    switchCam(false);

  } else {
    //ipcamInit();
    inputIP();
  }
*/

  //document.getElementById("stop-button").innerHTML = "■";
  const stopbtn = document.createElement("button");
  stopbtn.id = "stop-button";
  stopbtn.className = "btn btn-default button-control";
  //stopbtn.style.margin = "-20px 0px 0px 0px";
  stopbtn.style.padding = "0px 10px";
  stopbtn.setAttribute('type', 'button');
  stopbtn.setAttribute('onclick', 'inputMenu()');
  document.getElementById("select-container").append(stopbtn);
  //document.getElementById("stop-button").innerHTML = "■";
  document.getElementById("stop-button").innerHTML = "⌂";



}

