/* TO-DO: Handle downloads and download button */

function getCookie( name ) {
  var parts = document.cookie.split(name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function expireCookie( cName ) {
    document.cookie = 
        encodeURIComponent(cName) + "=deleted; expires=" + new Date( 0 ).toUTCString();
}

function setCursor( docStyle, buttonStyle ) {
    document.getElementById( "doc" ).style.cursor = docStyle;
    document.getElementById( "button-id" ).style.cursor = buttonStyle;
}

function setFormToken() {
    var downloadToken = new Date().getTime();
    document.getElementById( "downloadToken" ).value = downloadToken;
    return downloadToken;
}

var downloadTimer;
var attempts = 30;

// Prevents double-submits by waiting for a cookie from the server.
function blockResubmit() {
    var downloadToken = setFormToken();
    setCursor( "wait", "wait" );

    downloadTimer = window.setInterval( function() {
        var token = getCookie( "downloadToken" );

        if( (token == downloadToken) || (attempts == 0) ) {
            unblockSubmit();
        }

        attempts--;
    }, 1000 );
}

function unblockSubmit() {
  setCursor( "auto", "pointer" );
  window.clearInterval( downloadTimer );
  expireCookie( "downloadToken" );
  attempts = 30;
}

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({
        installed: new Date().getTime()
    });
});
