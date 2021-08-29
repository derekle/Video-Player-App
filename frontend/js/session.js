/* Create session class to hold fetched data locally,
so we dont have to fetch all the time.*/

let Session = class {
	constructor(
		roomname,
		roomID,
		username,
		userID,
		playlistID,
		currentSong,
		playlist
	) {
		this.roomname = roomname;
		this.roomID = roomID;
		this.username = username;
		this.userID = userID;
		this.playlistID = playlistID;
		this.currentSong = currentSong;
		this.playlist = playlist;
	}
};
let session = new Session(null, null, null, null, null, null, []);

// function to format url to an embed
function formatURL(song) {
	session.currentSong =
		// replace vanilla YT links to an embed flag, with autoplay and mute on
		//song.toString().split('/')[3].split('?')[1].substring(2);
		song.toString().replace('watch?v=', 'embed/');
}

// function to update the current song. takes argument of a url string, taken from the DOM element that's been clicked
function updateSong(element) {
	session.currentSong = element.lastChild.innerText;
	formatURL(session.currentSong);
}

// function to update playlist
function setPlaylist(playlist) {
	console.log('setPlaylist');
	session.playlist = playlist;
}

// function to set the room id and name
function setRoom(id, name) {
	console.log('setRoom');
	session.roomID = id;
	session.roomname = name;
	document.getElementById('room-name').innerHTML = 'Room: ' + name;
}
