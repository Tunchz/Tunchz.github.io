function swipedetect(touchsurface, callback){
  
    //var touchsurface = el,
    var swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 50, //required min distance traveled to be considered swipe
    restraint = 50, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}
  

window.addEventListener('load', function(){
    var el = document.getElementById('notification-container-right')
    var hidetimer = null
    swipedetect(el, function(swipedir){
        if ((swipedir == 'left' && rightpanel_isopen == 0)||(swipedir == 'right' && rightpanel_isopen == 1)) {switchRightpanel()}
        //if  {switchRightpanel()}
        if (swipedir != 'none'){console.log('You just swiped '+swipedir+'!');}
    })
}, false)

window.addEventListener('load', function(){
    var el = document.getElementById('notification-container-bottom')
    var hidetimer = null
    swipedetect(el, function(swipedir){
        if ((swipedir == 'up' && rightpanel_isopen == 0)||(swipedir == 'down' && rightpanel_isopen == 1)) {switchRightpanel()}
        //if  {switchRightpanel()}
        if (swipedir != 'none'){console.log('You just swiped '+swipedir+'!');}
    })
}, false)