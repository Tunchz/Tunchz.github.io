// Basic parameter for detection in millisecond
const detectionloopDelay = 1000;    
const verifyingPeriod = 5000;  
const missedDuration = 3000;      //must be greater than detectionloopDelay
const timetokeepverifiedfaces = 60000;

// Url for target google sheet script of insert the face record
const sheetUrl = "https://script.google.com/macros/s/AKfycbxxYJAPo5auDaZiy66RizPTMGE9QxLeIbUDRw_shEDpEbQoZCg/exec";
// Url for face log google sheet
const facelogsheetUrl = "https://spreadsheets.google.com/feeds/cells/1f2zLWOWivY_L72VW0odfmGGeF4wxve1D6o4VvQm2Spg/1/public/values?alt=json-in-script&callback=doData";
// Url for face models
const modelsUrl = "https://tunchz.github.io/Face.Rex/models";
// Url for trained face descriptor used to label known faces
const facedescriptorUrl = "https://tunchz.github.io/Face.Rex/descriptors/descriptor_withID.json";
// Load face labels list
const facelabels = loadcsvtoarray('https://tunchz.github.io/Face.Rex/descriptors/LabeledFaceList.csv');

var labelimg=[];
loadlabelimage("https://tunchz.github.io/Face.Rex/labeled_images_2",0,facelabels.length);

var summarysheetResults = [];

const videocontainer = document.getElementById('video-container');
const video = document.getElementById('video');
const isWidthSmall = window.matchMedia("(max-width:700px)");
const isHeightSmall = window.matchMedia("(max-height:700px)");
let detectedfaces = [];
let detectedfacesList = [];
let sendingList = [];
let lat = 0,long = 0,loc;
const croppadding = 0.2;  // padding factor

// Load face log to create detectedfacesList
summarysheetLoad(facelogsheetUrl);

// crossfilter variable
var sf,List_filtered;

var formatDate = d3.time.format("%d/%m/%Y");  //("%d %B %Y %H:%M:%S");
var formatTime = d3.time.format("%H:%M");     //("%H:%M:%S");

/**** Load all model needed for face ****/
Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri(modelsUrl),
  faceapi.nets.faceLandmark68Net.loadFromUri(modelsUrl),
  faceapi.nets.ssdMobilenetv1.loadFromUri(modelsUrl),
  faceapi.nets.faceExpressionNet.loadFromUri(modelsUrl),
  faceapi.nets.ageGenderNet.loadFromUri(modelsUrl)
]).then(startVideo) //then(start)

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


/**** add event listener to precess when video plays ****/
video.addEventListener('play',async () => {

  /**** define overlay canvas for drawing the results over the vedio ****/
  const canvas = faceapi.createCanvasFromMedia(video)
  videocontainer.append(canvas)


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
  const labeledFaceDescriptors = await loadLabeledDescriptor(facedescriptorUrl); //console.log(labeledFaceDescriptors);
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
  // 1st run-in to get face descriptor engine ready
  const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();

  const num_keep = verifyingPeriod/detectionloopDelay;

  /****Detect face and recognize for every detectionDelay milliseconds ****/
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
      var gender;
      if (resizedDetections[i].gender = 'male') {
        gender = "♂ ชาย";
      } else {
        gender = "♁ หญิง";
      }
      const expressions = resizedDetections[i].expressions;
      const maxValue = Math.max(...Object.values(expressions));
      const emotion = Object.keys(expressions).filter(
        item => expressions[item] === maxValue
      );



      /**** record detected faces to verify ****/
      var facefound,verifed = false;
      var progress = 0;

      /**** get bounding box on face ****/
      const box = resizedDetections[i].detection.box

      if (numfaces > 0) {
        for (j=0 ; j< numfaces ; j++) {
          if (detectedfaces[j].label == result.label) {
            facefound = true;
            if (detectedfaces[j].datetime.length > num_keep-1) {
              detectedfaces[j].datetime.shift();
              verifed = true;
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
      } else if (verifed) {
        bcolor = 'rgba(0, 0, 255, 1)';
        //canvas.getContext("2d").drawImage(labelimg[parseInt(result.label)], box.x-labelimg[parseInt(result.label)].width, box.y-20);
        canvas.getContext("2d").drawImage(labelimg[parseInt(result.label)], box.x+2, box.y+box.height-labelimg[parseInt(result.label)].height-2);
      } else {
        bcolor = 'rgba(255, 100, 0, 1)';
      }

      const drawBox = new faceapi.draw.DrawBox(box, { label: " "+ facelabels[parseInt(result.label)] + " "/* + " : " + Math.round(interpolatedAge) + gender +" ▷ "+ emotion*/,
                                                    lineWidth: 2, boxColor: bcolor, drawLabelOptions: {fontSize: 12}})
      drawBox.draw(canvas)
      const text = new faceapi.draw.DrawTextField([" "+ Math.round(interpolatedAge) + gender +" ▸ Mood : "+ emotion],{ x: box.x, y: box.y+box.height}, 
                                                    {anchorPosition: 'TOP_LEFT', backgroundColor : 'rgba(0, 0, 0, 0 )', fontColor : 'rgba(255, 255, 255, 1 )',
                                                    fontSize : 10, padding : 2});
      text.draw(canvas);

      // draw verifying progress bar
      if (!verifed & result.label != "unknown") {
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
                          'status'    : "sending"
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
    sendingList[0].status = "succeeded";
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
        detectedfacesList[k].detection++;
        //update detection number in the Table
        //document.getElementById('subtag-'+(detectedfacesList.length-k-1)+'-1').innerHTML = detectedfacesList[k].detection;
        updateTable();
      }
    }
    
    if (!faceinlist) {
      detectedfacesList.push(sendingList[0]);
      detectedfacesList[detectedfacesList.length-1].detection = 1;
      //console.log("radraw table");
      updateTable();      
    }

  }
}

function summarysheetLoad(url) {
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
}

// Handle array recieved from face log sheet to store in detectedfacesList
function handleResults(spreadsheetArray) {
  var facesList = [], inlist = false;

  //console.log(spreadsheetArray);
  for (r=1; r<spreadsheetArray.length; r++) {
    inlist = false;
    for (s=0; s<facesList.length; s++) {
      if (spreadsheetArray[r][1] == facesList[s].id & spreadsheetArray[r][2] == facesList[s].date) {
        inlist = true;
        facesList[s].detection++;
      }
    }
    //console.log(r,inlist);
    if (!inlist) {
      facesList.push({  
                      'id'        : spreadsheetArray[r][1],
                      'date'      : spreadsheetArray[r][2],
                      'timein'    : spreadsheetArray[r][3],
                      'mood'      : spreadsheetArray[r][4],
                      'location'  : spreadsheetArray[r][5],
                      'lat'       : spreadsheetArray[r][6],
                      'lon'       : spreadsheetArray[r][7],
                      'img'       : spreadsheetArray[r][8].replace(/\s/g, "+"),
                      'status'    : "succeeded",
                      'detection' : 1
      });      
    }
  }

  detectedfacesList = facesList;
  //console.log(detectedfacesList);

 displayTable();
  
}

function updateTable() {
  // remove table
  var removetable = document.getElementById('table_image');
  removetable.parentElement.removeChild(removetable);
  displayTable();
}


function displayTable() {

  sf = crossfilter(detectedfacesList);
  sf.date = sf.dimension(function(d) { return d.date; });

  //console.log(detectedfacesList);
  //console.log(sf.date.top(Infinity));

  //List_filtered = sf.date.filterExact("2020-07-19").bottom(Infinity);
  List_filtered = sf.date.top(Infinity)

  //console.log(sf.date.top(Infinity));
  //console.log(List_filtered);

  tabulateimg(List_filtered, ["img","id","location","date","timein","mood","status","detection"]); 
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
      arr = csv2array(data);
    }
  });
  for (i = 1; i < arr.length; i++) {
    labels.push(arr[i][1]);
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

var labelimg = [];

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
