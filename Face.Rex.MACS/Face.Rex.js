// Basic parameter for detection in millisecond
const detectionloopDelay = 1000;    
const verifyingPeriod = 5000;  
const missedDuration = 3000;      //must be greater than detectionloopDelay
const timetokeepverifiedfaces = 60000;
const timetoupdateResults = 60000;  // 1 minute
const facematcherThreshold = 0.49;   // greatest distance for face
const useTinyModel = false; //true;  // TinyFace model is not good for detecting small faces


// Initialize basic parameter
const num_keep = verifyingPeriod/detectionloopDelay;
var loop_i = 0;
var looptoUpdate = timetoupdateResults/detectionloopDelay;

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

d3.select('#table-container').append('table').attr("id","table_image");
var summarysheetResults = [];


const videocontainer = document.getElementById('video-container');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const isonMobile = onMobile();
console.log(isonMobile);
resizeAdjust();

const isWidthSmall = window.matchMedia("(max-width:700px)");
const isHeightSmall = window.matchMedia("(max-height:700px)");
let detectedfaces = [];
let detectedfacesList = [];
let sendingList = [];
let lat = 0,long = 0,loc;
const croppadding = 0.2;  // padding factor

// crossfilter variable
var sf,List_filtered;

var formatDate = d3.time.format("%d/%m/%Y");  //("%d %B %Y %H:%M:%S");
var formatTime = d3.time.format("%H:%M");     //("%H:%M:%S");
var formatTimeDisplay = d3.time.format("%H:%M:%S");
var formatDayDisplay = d3.time.format("%d");
var formatMonthDisplay = d3.time.format("%B");
var filterDate = formatDate(new Date());
var filterVerification = "verified";

// Load face log to create detectedfacesList
summarysheetLoad(facelogsheetUrl);

/**** Load all model needed for face ****/
if (useTinyModel) {
  console.log('Tiny Model is being loaded...')
  Promise.all([
    //faceapi.nets.ssdMobilenetv1.loadFromUri(modelsUrl),
    //faceapi.nets.faceLandmark68Net.loadFromUri(modelsUrl),
    faceapi.nets.tinyFaceDetector.loadFromUri(modelsUrl),
    faceapi.nets.faceRecognitionNet.loadFromUri(modelsUrl),
    faceapi.nets.faceLandmark68TinyNet.loadFromUri(modelsUrl),
    faceapi.nets.faceExpressionNet.loadFromUri(modelsUrl),
    faceapi.nets.ageGenderNet.loadFromUri(modelsUrl)
  ]).then(startVideo) //then(start)
} else {
  Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri(modelsUrl),
    faceapi.nets.faceLandmark68Net.loadFromUri(modelsUrl),
    faceapi.nets.faceRecognitionNet.loadFromUri(modelsUrl),
    faceapi.nets.faceExpressionNet.loadFromUri(modelsUrl),
    faceapi.nets.ageGenderNet.loadFromUri(modelsUrl)
  ]).then(startVideo) //then(start)
}

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => alert("error loading video >> "+err) //console.error(err)
  )
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

  $("#left-panel").height(($("#video-container").width())*3.1/4+100);
/*            $(".card-wrapper").height(120);
            $("#zone-map").height(700);
            $("#zone-nation-nation-age").height(600);
            $("#zone-date").height(300);
*/
        } else {
  $("#left-panel").height($("#wholecontent").height());

/*            $(".card-wrapper").height("0%");
            $("#zone-map").height("50%");
            $("#zone-nation-nation-age").height("70%");
            $("#zone-date").height("10%");
*/
        }

  if (isonMobile) {
    $("#video").width(($("#video-container").width()-40));
    $("#video").height(($("#video-container").width()-40)*4/3);
    $("#canvas").width(($("#video-container").width()-40));
    $("#canvas").height(($("#video-container").width()-40)*4/3);

  } else {
    $("#video").width(($("#video-container").width()-40));
    $("#video").height(($("#video-container").width()-40)*3/4);
    $("#canvas").width(($("#video-container").width()-40));
    $("#canvas").height(($("#video-container").width()-40)*3/4);

  }
/*      video.style.width = "320px";
      video.style.height = "240px";
      canvas.style.width = "320px";
      canvas.style.height = "240px";
*/
}

function onMobile() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

/**** add event listener to precess when video plays ****/
video.addEventListener('play',async () => {

  /**** define overlay canvas for drawing the results over the vedio ****/
  //const canvas = faceapi.createCanvasFromMedia(video)
  //videocontainer.append(canvas)

  /**** define display size and format canvas size to match ****/
  var displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)

  /**** display notification ****/
  const noti = new faceapi.draw.DrawBox({ x: 0, y: 10, width: 0, height: 0 }, { label: " Loading face model... " });
  noti.draw(canvas);
 
  //console.log("load models");
  /**** load model from save lebeled descriptor from json file ****/
  const labeledFaceDescriptors = await loadLabeledDescriptor(facedescriptorUrl); //console.log(labeledFaceDescriptors);
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, facematcherThreshold)
  // 1st run-in to get face descriptor engine ready
  //const TinyFaceDetectorOptions = new faceapi.TinyFaceDetectorOptions()
  const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();

  var canvas_ctx = canvas.getContext('2d');


  /****Detect face and recognize for every detectionDelay milliseconds ****/
  //console.log("loop start!")
  setInterval(async () => {
    loop_i++;
    /**** Detect face ▶ find face landmark ▶ predict agaist face descriptor ▶ predict face expression ▶ predict age&gender****/
    const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors().withFaceExpressions().withAgeAndGender();
    // Use TinyFace Model
    //const detections = await faceapi.detectAllFaces(video,TinyFaceDetectorOptions).withFaceLandmarks(useTinyModel).withFaceDescriptors().withFaceExpressions().withAgeAndGender();

    /****Resize the result of detection matching the display size ****/
    const resizedDetections = faceapi.resizeResults(detections, displaySize)

    /**** Match the faces detected with the descriptor ****/
    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))

    /**** Clear the previous overlay draw on the canvas ****/
    //canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

    canvas_ctx.clearRect(0, 0, canvas.width, canvas.height);


    var timenow = new Date();
    var numfaces = detectedfaces.length;

    //Display time
    /*const timedisplay = new faceapi.draw.DrawTextField([" "+formatTimeDisplay(timenow)+" "],{ x: canvas.width, y: 0}, 
                                                  {anchorPosition: 'TOP_RIGTH', backgroundColor : 'rgba(0, 0, 255, 1 )', fontColor : 'rgba(255, 255, 255, 1 )',
                                                  fonts : "Impact", fontSize : 16, padding : 2});
    timedisplay.draw(canvas);
*/
  
    canvas_ctx.lineWidth = "12";
    canvas_ctx.strokeStyle = "blue";
    canvas_ctx.rect(canvas.width - 80, 6, 80, 12);
    canvas_ctx.stroke();
    canvas_ctx.font = "20px Impact";
    //canvas_ctx.fillStyle = "blue";
    canvas_ctx.fillText(" "+formatTimeDisplay(timenow)+" ", canvas.width - 80, 20);

    results.forEach((result, i) => {

      /**** extract age gender emotion from result ****/
      const age = resizedDetections[i].age;
      var gender = 'unknown';
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
      const box = resizedDetections[i].detection.box

      // adjust box to fit face for Tiny model
      //const box_ = resizedDetections[i].detection.box
      //const box = {x:box_.x+0.1*box_.width, y:box_.y-0.1*box_.width, width:0.8*box_.width, height:box_.height};


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
              ctx.drawImage(video, box.x+box.width/2-box.height*(0.5+1.5*croppadding), box.y-box.height*2*croppadding, 
                             box.height*(1+3*croppadding), box.height*(1+3*croppadding), 0, 0,  box.height*(1+3*croppadding), box.height*(1+3*croppadding));
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
      drawBox.draw(canvas)
      const text = new faceapi.draw.DrawTextField([" "+ Math.round(age) + gender +" ▸ Mood : "+ emotion],{ x: box.x, y: box.y+box.height}, 
                                                    {anchorPosition: 'TOP_LEFT', backgroundColor : 'rgba(0, 0, 0, 0 )', fontColor : 'rgba(255, 255, 255, 1 )',
                                                    fontSize : 10, padding : 2});
      text.draw(canvas);

      // draw verifying progress bar
      if (!verified & result.label != "unknown") {
        const progressBar = new faceapi.draw.DrawBox({ x: box.x+4, y: box.y+box.height-6, width: (box.width-8)/5*progress, height: 2 },
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
        //compensate time for verified face for 15s total
        timemissed = timemissed - timetokeepverifiedfaces + missedDuration;
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


    if (loop_i>looptoUpdate-1) {
      // update time
      //document.getElementById("total-status").innerHTML = formatTime(new Date());

      // update results

      summarysheetLoad(facelogsheetUrl);

      loop_i = 0;
    }

  }, detectionloopDelay)
  
})

function detectedfacelistAdd(facerec, mood, imgdata) {

  sendingList.unshift({  
                          'id'        : facerec.label,
                          'date'      : formatDate(facerec.last),
                          'timein'    : formatTime(facerec.last),
                          'mood'      : mood,
                          'location'  : loc,
                          'lat'       : lat,
                          'lon'       : long,
                          'img'       : imgdata,
                          'status'    : "sending",
                          'verified'  : facerec.label == 'unknown' ? "unknown" : "verified"
  });

  var serializedData = "id=" + sendingList[0].id
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
    sendingList[0].status = sendingList[0].id=="unknown"?"unknown":"succeeded";
    addtoList();
    sendingList.shift();
    //console.log("Sending succeeded.",detectedfacesList,"unsent : "+sendingList.length);

  });

  // callback handler that will be called on failure
  request.fail(function (jqXHR, textStatus, errorThrown){
    sendingList[0].status = "failed";
    addtoList();
    console.error("The following error occured: "+ textStatus, errorThrown);

  });



  function addtoList() {
    // add new detected face into detectedfacesList if not exist
    var faceinlist = false;
    for (k=0; k<detectedfacesList.length; k++) {
      if (detectedfacesList[k].id == sendingList[0].id & detectedfacesList[k].date == sendingList[0].date) {
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
    
    if (!faceinlist) {
      detectedfacesList.push(sendingList[0]);
      detectedfacesList[detectedfacesList.length-1].detection = 1;
      detectedfacesList[detectedfacesList.length-1].last = formatTime(facerec.last);
      detectedfacesList[detectedfacesList.length-1].timestamp = facerec.last;

      //console.log("add",detectedfacesList);
      updateTable();  

    }

  }
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
      var d = spreadsheetArray[r][2].split('/');
      facesList./*push*/unshift({  
                      'id'        : spreadsheetArray[r][1],
                      'date'      : spreadsheetArray[r][2],
                      'timein'    : spreadsheetArray[r][3],
                      'last'      : spreadsheetArray[r][3],
                      'mood'      : spreadsheetArray[r][4],
                      'location'  : spreadsheetArray[r][5],
                      'lat'       : spreadsheetArray[r][6],
                      'lon'       : spreadsheetArray[r][7],
                      'img'       : spreadsheetArray[r][8].replace(/\s/g, "+"),
                      'status'    : spreadsheetArray[r][1]=="unknown"?"unknown":"succeeded",
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
  const totaltoverified = facestoverifyList.length;

  sf = crossfilter(detectedfacesList);
  sf.date = sf.dimension(function(d) { return d.date; });
  sf.timestamp = sf.dimension(function(d) { return d.timestamp; });
  sf.id = sf.dimension(function(d) { return d.id; });
  sf.verified = sf.dimension(function(d) { return d.verified; });

  //console.log(detectedfacesList);
  //console.log(sf.date.top(Infinity));

  // clear previous verification filter
  sf.verified.filterAll();

  // filter by selected date
  sf.date.filterExact(filterDate/*"21/07/2020"*/).top(Infinity);

  // count verified and unknown faces
  var totaldetected = sf.id.top(Infinity).length;
  var unknown = sf.id.filterExact("unknown").top(Infinity).length;

  // clear id filter
  sf.id.filterAll();

  // Sort by timestamp
  List_filtered = sf.timestamp.top(Infinity);

  // count number of detections
  var detection = 0;
  for (t=0;t<List_filtered.length;t++) {
    detection = detection + List_filtered[t].detection;
    //console.log(detection,parseInt(List_filtered[t].detection));
  }

  // filter verification status
  if (filterVerification == "nonverified") {
    List_filtered = sf.verified.filterExact("verified").top(Infinity);
    for (s=0; s<facestoverifyList.length; s++) {
      facestoverifyList[s].verified = "nonverified";
    }
    for (s=0; s<List_filtered.length; s++) {
      facestoverifyList[parseInt(List_filtered[s].id)].verified = "verified";
      //console.log(List_filtered[s].id);
    }
    
    var fl = crossfilter(facestoverifyList);
    fl.verified = fl.dimension(function(d) { return d.verified; });
    fl.dept = fl.dimension(function(d) { return d.last; });
    fl.id = fl.dimension(function(d) { return parseInt(d.id); });
    fl.verified.filterExact("nonverified") 
    //var f = ["MHL", "MACS"];
    //fl.dept.filter(function(d){return f.indexOf(d) > -1;});
    //fl.dept.filterFunction(multivalue_filter(["MACS"]));
    List_filtered = fl.id.bottom(Infinity);
    //console.log(List_filtered.length,List_filtered);


//fruitDimension.filterFunction(multivalue_filter(["apple","lemon","orange"]));


  } else {
    sf.verified.filterExact(filterVerification).top(Infinity);
    List_filtered = sf.timestamp.top(Infinity);
  }


  // Update Stats
  document.getElementById("total-detectedfaces").innerHTML = totaldetected;
  document.getElementById("total-verified").innerHTML = totaldetected - unknown;
  document.getElementById("total-status").innerHTML = isonMobile ? "Mobile Mode" : "Desktop Mode";//formatTime(new Date());
  document.getElementById("total-tobeverified").innerHTML = totaltoverified - (totaldetected - unknown);
  document.getElementById("total-detection").innerHTML = detection;//+' ครั้ง';
  document.getElementById("total-unknown").innerHTML = unknown;
  document.getElementById("daydisplay").innerHTML = formatDayDisplay($('#datepicker').datepicker('getDate'));
  document.getElementById("monthdisplay").innerHTML = formatMonthDisplay($('#datepicker').datepicker('getDate'));
  //console.log(filterDate,formatDateDisplay($('#datepicker').datepicker('getDate')));


  //console.log(detectedfacesList.length,List_filtered.length)

  // Create Table
  tabulateimg(List_filtered, ["img","id","location","date","timein","last","mood","status","detection"]); 
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
                    'location'  : arr[i][4],
                    'lat'       : " ",
                    'lon'       : " ",
                    'img'       : mini_img.src,
                    'status'    : "toverify",
                    'verified'  : "nonverified",
                    'timestamp' : " ",
                    'detection' : " "
    }); 

  }


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