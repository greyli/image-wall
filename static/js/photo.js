var progressElem, statusElem;
var supportsProgress;
var loadedImageCount, imageCount;

var demo = document.querySelector('#impress');
var container = demo.querySelector('#image-container');
statusElem = document.querySelector('#status');
testElem = document.querySelector('#loader');
progressElem = demo.querySelector('progress');

// loading mask
function showdiv() {
    document.getElementById("mask-bg").style.display ="block";
    document.getElementById("mask-show").style.display ="block";
}
function hidediv() {
    document.getElementById("mask-bg").style.display ='none';
    document.getElementById("mask-show").style.display ='none';
    document.getElementById("tips").style.display ='none';
    document.getElementById("loader").style.display ='none';
}

//imageloaded
$('#image-container').imagesLoaded()
  .always( function( instance ) {
    console.log('all images loaded');
    //statusElem.style.opacity = 0;
    hidediv();
  })
  .progress( function( instance, image ) {
    var result = image.isLoaded ? 'loaded' : 'broken';
    loadedImageCount++;
    progressElem.setAttribute( 'value', loadedImageCount );
    console.log( 'image is ' + result + ' for ' + image.img.src );
  });

// switch to or from fullscreen mode
function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();  
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen();  
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else {  
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  }  
}