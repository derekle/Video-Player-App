let Session = class {
	constructor(roomname, roomID, username, userID, playlistID) {
		this.roomname = roomname;
		this.roomID = roomID;
		this.username = username;
		this.userID = userID;
		this.playlistID = playlistID;
	}
};
let session = new Session(null, null, null, null, null);

document.addEventListener('DOMContentLoaded', function () {
	// fetchTables('users');
	// formaddEventListener('users');
	fetchRoom();
	formaddEventListener('rooms');
});

function formaddEventListener(resrc) {
	document.getElementById(resrc + 'Form').addEventListener(
		'submit',
		function (event) {
			fetchForm(event, resrc);
		}
	);
}

function convert(fd) {
	let obj = {};
	for (let key of fd.keys()) {
		obj[key] = fd.get(key);
	}
	return JSON.stringify(obj);
}

async function roomClicked(n) {
	session.roomname = n;
	document.getElementById('room-name').innerHTML = 'Room: ' + n;
	const rid = await this.fetchRoomID();
	session.roomID = rid;
	const pid = await this.fetchPlaylistID();
	session.playlistID = pid;

	console.log('rid: ' + session.roomID);
	console.log('pid: ' + session.playlistID);

	if (session.username == null) {
		buildUsersForm();
		formaddEventListener('users');
	} else {
		renderRoom();
		fetchPlaylist('playlists/' + session.playlistID);
	}
}
