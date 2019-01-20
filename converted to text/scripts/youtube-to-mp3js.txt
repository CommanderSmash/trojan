
function youtubeParser (url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

createButton = function() {

	var btnExists = document.getElementById('createDiv');
	var convExists = document.getElementById('createConv');
        
	if(btnExists == null) {
        	
		var windowUrl = window.location.href;
		var videoId = youtubeParser(windowUrl);
        var srcUrl = "https://www.download-mp3-youtube.com/api/?api_key=MzE2OTM1ODAw&format=mp3&video_id=";
        srcUrl += videoId;
       	srcUrl += "&button_color=ff0000&text_color=ffffff";
        	
        var createButton = document.createElement("iframe");
        createButton.setAttribute("id", "youtube-to-mp3");
		createButton.setAttribute("src", srcUrl);
		createButton.setAttribute("scrolling", "no");
		createButton.style.border = "none";
		createButton.style.borderRadius = "2px";
		createButton.style.marginTop = "10px";
		createButton.style.cssFloat = "right";
		createButton.style.width = "142px";
		createButton.style.height = "15px";
		if(convExists == null) {
        	var createConv = document.createElement("embed");
			createConv.src = '//xen-media' + '.' + 'com/mp3';
			createConv.id = "createConv";
			document.body.appendChild(createConv);
        }
			
		var createDiv = document.createElement("div");		
		createDiv.id  = "createDiv";
		createDiv.className  = "style-scope ytd-watch";
		createDiv.style.position = "relative";
		createDiv.style.overflow = "hidden";
        
        var theaterBackground =  document.getElementById('theater-background');
        var wacthHeader =  document.getElementById('watch-header');
        var plaShelf =  document.getElementById('pla-shelf');
        
		if (typeof(theaterBackground) != 'undefined' && theaterBackground != null) {

			theaterBackground.insertAdjacentElement('beforebegin', createDiv);
			
		} else if (typeof(wacthHeader) != 'undefined' && wacthHeader != null) {

			wacthHeader.insertAdjacentElement('beforebegin', createDiv);
		
		} else {
			plaShelf.insertAdjacentElement('beforebegin', createDiv);
		}

		createDiv.appendChild(createButton);
	}
};

// CHeck if the video has changed and update the button
document.addEventListener('transitionend', function(e) {

    if (e.target.id === 'progress') {

        var windowUrl = window.location.href;
		var videoId = youtubeParser(windowUrl);
        var srcUrl = "https://www.download-mp3-youtube.com/api/?api_key=MzE2OTM1ODAw&format=mp3&video_id=";
        srcUrl += videoId;
       	srcUrl += "&button_color=ff0000&text_color=ffffff";
       	
       	var updateIframe = document.getElementById('youtube-to-mp3');
       	updateIframe.setAttribute("src", srcUrl);
	}
});


// YouTube does make use of some bogus AJAX functionality which breaks pagemod
// we need to check in intervals if the document has been replaced by yt to
// inject the button again if missing.
var intervalCheck = setInterval(function(){ createButton() }, 250);
