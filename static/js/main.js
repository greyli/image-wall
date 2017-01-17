// hide loading animation (use imageloaded)
$('#image-container').imagesLoaded()
    .always( function( instance ) {
        document.getElementById('mask-bg').style.display = 'none';
        document.getElementById('blue-loader').style.display = 'none';
});

// control image wall (vertically)
$('#down').click(function() {
   impress().next();
});

$('#up').click(function() {
   impress().prev();
});

// switch to full screen
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