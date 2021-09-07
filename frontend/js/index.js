/*All code on this file is handling user interaction with the app */

// On app startup, render room list.
document.addEventListener('DOMContentLoaded', async () => {
	await buildroomList();
	refreshBtn();
});

// function for creating click listeners to any table object
async function buildroomList() {
	let data = await fetchRoom();
	formaddEventListener('rooms', 'post');
	modifyTable('rooms', data);
}

function refreshBtn() {
	const refreshBtn = document.getElementById('refresh');
	refreshBtn.addEventListener('click', async function () {
		document.querySelectorAll('.currentRoom').forEach((a) =>
			a.remove()
		);
		document.querySelectorAll('.roomstableRow').forEach((a) =>
			a.remove()
		);
		buildroomList();
	});
}

function formaddEventListener(resrc, method) {
	document.getElementById(resrc + 'Form').addEventListener(
		'submit',
		//when a user hits submit:
		async function (event) {
			//[ 1 ] collect the data and package it into a request variable (JSON object)
			let request = fillForm(event, resrc, method);
			//[ 2 ] POST request to server, await for response
			console.log(request);
			data = await sendForm(request);
			//[ 3 ] Manipulate the relevant DOM table for the resource, based on returned data
			modifyTable(resrc, data);
		}
	);
}

// the function that is called when a user clicks on a room. assigned when building the table in addRow
async function roomClicked(n, $this) {
	// user clicked element
	console.log('roomClicked');

	// interact with server
	const currentRoom = await this.fetchRoomByName(n);
	const currentPlaylist = await this.fetchPlaylistByRoomID(
		currentRoom.id
	);
	const plist = await fetchPlaylist(currentPlaylist.id);

	session.currentSong = null;
	session.currentRoom = currentRoom;
	session.currentPlaylist = currentPlaylist;

	// update DOM
	deleteElementByID('player');
	deleteElementByID('container');
	deleteAllChildNodesByID('playlistsTable');
	setDOMCurrentRoom($this);
	updateDOMRoomName(n);
	setPlaylist(plist);

	if (session.currentUser) {
		session.currentUser.room_id = session.currentRoom.id;
		patchResource('users', session.currentUser);
		if (session.playlist.songs[0]) {
			renderRoom();
		} else {
			if (session.currentPlaylist.songs.length > 0) {
				formatURL(
					session.currentPlaylist.songs[0].source
				);
			}
		}
	} else {
		buildForm('users');
		formaddEventListener('users', 'post');
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
