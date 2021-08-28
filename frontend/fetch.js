async function fetchForm(ev, resrc) {
	// stop page from refreshing on submit
	ev.preventDefault();

	// specify which form to get information from (sender)
	let myForm = ev.target;

	// create form data object from submitted info (shipping label)
	let fd = new FormData(myForm);
	// convert form data to json (get right box size)
	let json = await convert(fd);
	convert(fd);

	// get address to send package (recipient)
	let url = 'http://localhost:3000/' + resrc;

	// package information to send to server (box it up)
	let req = new Request(url, {
		body: json,
		method: 'POST',
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});

	// send package to server (shipped!)
	fetch(req)
		// receive response
		.then((result) => result.json())
		// throw out junk mail
		.then((data) => {
			if (resrc == 'rooms') {
				addRow(
					data.name,
					resrc + 'Table',
					resrc + 'Body',
					data.users.length
				);
			}
			if (resrc == 'users') {
				session.username = data.name;
				session.userID = data.id;
				updateUserName();
				deleteElementByID('usersForm');
				renderRoom();
			}
		})
		.catch((error) => {
			console.error(error);
		});
}

function fetchRoom() {
	fetch('http://localhost:3000/rooms')
		//deserialize js to return objects
		.then((result) => result.json())
		//extract data from array of objects
		.then((data) => {
			//build table out of data
			for (obj of data) {
				addRow(
					obj.name,
					'rooms',
					'roomsTable',
					'roomsBody',
					obj.users.length
				);
			}
		});
}

function fetchPlaylist(resrc) {
	console.log(resrc);
	fetch('http://localhost:3000/' + resrc)
		//deserialize js to return objects
		.then((result) => result.json())
		//extract data from array of objects
		.then((data) => {
			console.log(data);
			for (song of data.songs) {
				addRow(
					data.songs.indexOf(song),
					'playlists',
					'playlistsTable',
					'playlistsBody',
					song.source
				);
			}
		});
}

function fetchRoomID() {
	return fetch('http://localhost:3000/rooms')
		.then((result) => result.json())
		.then((data) => {
			for (room of data) {
				if (session.roomname == room.name) {
					return room.id;
				}
			}
		});
}

function fetchUser(resrc) {
	fetch('http://localhost:3000/' + resrc)
		//deserialize js to return objects
		.then((result) => result.json())
		//extract data from array of objects
		.then((data) => {
			for (obj of data) {
				if (resrc == 'users') {
					addRow(
						obj.name,
						resrc,
						resrc + 'Table',
						resrc + 'Body'
					);
				}
			}
		});
}

function fetchPlaylistID() {
	return fetch('http://localhost:3000/playlists')
		.then((result) => result.json())
		.then((data) => {
			for (playlist of data) {
				if (session.roomID == playlist.room_id) {
					return playlist.id;
				}
			}
		});
}
