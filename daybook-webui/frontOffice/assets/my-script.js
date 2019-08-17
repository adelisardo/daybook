$(document).ready(function () {
    $("body").removeAttr("style");
    intiFullScreen();
})
function intiFullScreen() {
    $(document).on('click', '.fullscreen', function () {
        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
            $('.fullscreen i').attr('class', "fa fa-compress");
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
            $('.fullscreen i').attr('class', "far fa-arrows-alt");
        }
    });

    $(window).resize(function () {
        if (!document.fullscreenElement &&
            !document.mozFullScreenElement && !document.webkitFullscreenElement) {
            $('.fullscreen i').attr('class', "far fa-arrows-alt");
        } else {
            $('.fullscreen i').attr('class', "fa fa-compress");
        }
    });
}