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

document.addEventListener('DOMContentLoaded', async function () {
	// fetchTables('users');
	// formaddEventListener('users');
	let data = await fetchRoom();
	modifyTable('rooms', data);
	formaddEventListener('rooms', 'post');
});

function formaddEventListener(resrc, method) {
	document.getElementById(resrc + 'Form').addEventListener(
		'submit',
		async function (event) {
			console.log(resrc);
			let request = fillForm(event, resrc, method);
			data = await sendForm(request);
			modifyTable(resrc, data);
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
	console.log('roomClicked');
	session.roomname = n;
	document.getElementById('room-name').innerHTML = 'Room: ' + n;
	const rid = await this.fetchRoomID();
	session.roomID = rid;
	const pid = await this.fetchPlaylistID();
	session.playlistID = pid;
	if (session.username == null) {
		buildUsersForm();
		formaddEventListener('users', 'post');
	} else {
		renderRoom();
	}
}
