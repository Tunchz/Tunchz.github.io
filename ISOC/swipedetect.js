
function detectswipe(el,func) {
  swipe_det = new Object();
  swipe_det.sX = 0;
  swipe_det.sY = 0;
  swipe_det.eX = 0;
  swipe_det.eY = 0;
  var min = 40, //required min distance traveled to be considered swipe
  max = 20, // maximum distance allowed at the same time in perpendicular direction
  allowedTime = 300, // maximum time allowed to travel that distance
  direc, elapsedTime, startTime;
  ele = document.getElementById(el);
  ele.addEventListener('touchstart',function(e){
    var t = e.touches[0];
    swipe_det.sX = t.screenX; 
    swipe_det.sY = t.screenY;
    swipe_det.eX = 0; 
    swipe_det.eY = 0;    
    direc = "";
    startTime = new Date().getTime(); // record time when finger first makes contact with surface
  },false);
  ele.addEventListener('touchmove',function(e){
    //e.preventDefault();
    var t = e.touches[0];
    swipe_det.eX = t.screenX; 
    swipe_det.eY = t.screenY;    
  },false);
  ele.addEventListener('touchend',function(e){
    elapsedTime = new Date().getTime() - startTime; // get time elapsed
    //console.log(swipe_det.sX,swipe_det.sY,"|",swipe_det.eX,swipe_det.eY);
    //console.log(elapsedTime,swipe_det.eX - swipe_det.sX,swipe_det.eY - swipe_det.sY);
    //horizontal detection
    if (elapsedTime <= allowedTime){
        if ((Math.abs(swipe_det.eX - swipe_det.sX) > min) && (Math.abs(swipe_det.eY - swipe_det.sY) < max)) {
          if(swipe_det.eX > swipe_det.sX) direc = "r"; else direc = "l";
        }
        //vertical detection
        if ((Math.abs(swipe_det.eY - swipe_det.sY) > min) && (Math.abs(swipe_det.eX - swipe_det.sX) < max)) {
          if(swipe_det.eY > swipe_det.sY) direc = "d"; else direc = "u";
        }

        if (direc != "") {
          if(typeof func == 'function') func(el,direc);
        }
    }
  },false);  
}

// add event listener for swipe
detectswipe('notification-container-right',LRactions);
detectswipe('vertical-table-container-MAP',UDactions);

function LRactions(el,swipedir) {
    if ((swipedir == 'l' && rightpanel_isopen == 0)||(swipedir == 'r' && rightpanel_isopen == 1)) {switchRightpanel()}
    //console.log(el+" : "+swipedir);
}

function UDactions(el,swipedir) {
    if ((swipedir == 'u' && rightpanel_isopen == 0)||(swipedir == 'd' && rightpanel_isopen == 1)) {switchRightpanel()}
    //console.log(el+" : "+swipedir);
}




// // This Swipe Detection 2nd method ====================================


// function swipedetect(touchsurface, callback){
  
//     //var touchsurface = el,
//     var swipedir,
//     startX,
//     startY,
//     distX,
//     distY,
//     threshold = 40, //required min distance traveled to be considered swipe
//     restraint = 20, // maximum distance allowed at the same time in perpendicular direction
//     allowedTime = 300, // maximum time allowed to travel that distance
//     elapsedTime,
//     startTime,
//     handleswipe = callback || function(swipedir){}
  
//     touchsurface.addEventListener('touchstart', function(e){
//         var touchobj = e.changedTouches[0]
//         swipedir = 'none'
//         dist = 0
//         startX = touchobj.pageX
//         startY = touchobj.pageY
//         startTime = new Date().getTime() // record time when finger first makes contact with surface
//         //e.preventDefault()
//     }, false)
  
//     touchsurface.addEventListener('touchmove', function(e){
//         //e.preventDefault() // prevent scrolling when inside DIV
//     }, false)
  
//     touchsurface.addEventListener('touchend', function(e){
//         var touchobj = e.changedTouches[0]
//         distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
//         distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
//         elapsedTime = new Date().getTime() - startTime // get time elapsed
//         if (elapsedTime <= allowedTime){ // first condition for awipe met
//             if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
//                 swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
//             }
//             else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
//                 swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
//             }
//         }
//         handleswipe(swipedir)
//         //e.preventDefault()
//     }, false)
// }

// window.addEventListener('load', function(){
//     var el = document.getElementById('notification-container-right')
//     var hidetimer = null
//     swipedetect(el, function(swipedir){
//         if ((swipedir == 'left' && rightpanel_isopen == 0)||(swipedir == 'right' && rightpanel_isopen == 1)) {switchRightpanel()}
//         //if  {switchRightpanel()}
//         if (swipedir != 'none'){console.log('You just swiped '+swipedir+'!');}
//     })
// }, false)

// window.addEventListener('load', function(){
//     var el = document.getElementById('notification-container-bottom')
//     var hidetimer = null
//     swipedetect(el, function(swipedir){
//         if ((swipedir == 'up' && rightpanel_isopen == 0)||(swipedir == 'down' && rightpanel_isopen == 1)) {switchRightpanel()}
//         //if  {switchRightpanel()}
//         if (swipedir != 'none'){console.log('You just swiped '+swipedir+'!');}
//     })
// }, false)