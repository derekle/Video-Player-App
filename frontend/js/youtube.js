//ALL CODE HERE IS FOR HANDLING THE YOUTUBE PLAYER API

console.log('youtube.js');

function loadYTAPI() {
	console.log('loadYTAPI');
	let element = document.getElementById('api-script');
	console.log(element);

	if (!element) {
		var tag = document.createElement('script');
		tag.async = true;
		tag.src = 'https://www.youtube.com/iframe_api';
		tag.id = 'api-script';
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}
}

function onYouTubeIframeAPIReady() {
	console.log('api ready');
	var player;
	player = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: session.currentSong,
		playerVars: {
			playsinline: 1,
			autoplay: 1,
			disablekb: 1,
			enablejsapi: 1,
			modestbranding: 1,
			origin: 'localhost:3000',
		},
		events: {
			onReady: onPlayerReady,
			onStateChange: onPlayerStateChange,
		},
	});
}

//EVENT HANDLING IS CURRENTLY NOT WORKING ON LOCALHOST
//Works on jsfiddle, etc for some reason.
function onPlayerReady(event) {
	alert('ready');
}

var done = false;
function onPlayerStateChange(event) {
	console.log('state changed');

	console.log(event);
	if (event.data == YT.PlayerState.PLAYING && !done) {
		setTimeout(stopVideo, 6000);
		done = true;
	}
}
function stopVideo() {
	player.stopVideo();
}
