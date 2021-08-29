/*All code on this file is handling user interaction with the app */

// On app startup, render room list.
document.addEventListener('DOMContentLoaded', async () => {
	let data = await fetchRoom();
	modifyTable('rooms', data);
	formaddEventListener('rooms', 'post');
});

// function for creating click listeners to any table object
function formaddEventListener(resrc, method) {
	document.getElementById(resrc + 'Form').addEventListener(
		'submit',
		//when a user hits submit:
		async function (event) {
			//[ 1 ] collect the data and package it into a request variable (JSON object)
			let request = fillForm(event, resrc, method);
			//[ 2 ] POST request to server, await for response
			data = await sendForm(request);
			//[ 3 ] Manipulate the relevant DOM table for the resource, based on returned data
			modifyTable(resrc, data);
		}
	);
}

// the function that is called when a user clicks on a room. assigned when building the table in addRow
async function roomClicked(n) {
	// reset the current song, since we're entering a new room
	session.currentSong = null;
	// remove any players that are on screen
	deleteElementByID('player');
	console.log('roomClicked');
	// set the local roomname to the argument that's been passed in (the name of the room)
	session.roomname = n;

	//Update DOM element - screen should now show the current room the user is in
	updateDOMRoomName();
	// get the room id
	const rid = await this.fetchRoomID();
	session.roomID = rid;

	// get the playlist id
	const pid = await this.fetchPlaylistID();
	session.playlistID = pid;

	// get the playlist
	const plist = await fetchPlaylist('playlists/' + pid);
	setPlaylist(plist);

	// if the room has an existing playlist with songs in it, set the first song to be the current song
	if (session.playlist.songs[0]) {
		formatURL(session.playlist.songs[0].source);
	}
	/* users will enter username when entering a room, beginning their session.
	if user is already created, render the room*/
	if (session.username == null) {
		buildUsersForm();
		formaddEventListener('users', 'post');
	} else {
		renderRoom();
	}
}

// the function that is called when user clicks on a song in the playlist. assigned when building the table in addRow
// takes in the URL string from the DOM element that is being clicked as an argument
async function songClicked($this) {
	console.log('songClicked');
	// update the current song
	await updateSong($this);
	// render the room
	renderRoom();
}