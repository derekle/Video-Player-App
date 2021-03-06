/* All fetch functions return only data.
Data manipulation is to be done in the 
original function that called it */

//////////////////////////////////////////////////
// Prepare Form Data For Post Requests//
//////////////////////////////////////////////////

function fillForm(ev, resrc, method) {
	console.log('fillForm');
	//debugger;
	// stop page from refreshing on submit
	ev.preventDefault();
	// specify which form to get information from (sender)
	let myForm = ev.target;
	// create form data object from submitted info (shipping label)
	let fd = new FormData(myForm);
	// convert form data to json (get right box size)
	let json = convert(fd);
	convert(fd);
	// get address to send package (recipient)
	let url = 'http://localhost:3000/' + resrc;
	// package information to send to server (box it up)
	let req = new Request(url, {
		body: json,
		method: method,
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
	return req;
}
// ERROR HANDLING//
function errors(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}
///////////////////////
// POST Requests //
///////////////////////
function sendForm(req) {
	console.log('sendForm');
	console.log(req);
	return (
		fetch(req)
			.then(errors)
			// receive response
			.then((response) => response.json())
			// throw out junk mail
			.then((data) => {
				return data;
			})
			.catch((error) => {
				alert(
					error +
						'. Rooms should be unique. Links should match the format (https://.../watch?v=Video_ID). '
				);
			})
	);
}

function patchResource(resrc, data) {
	console.log('postResource');
	console.log(resrc);
	let json = JSON.stringify(data);
	let url = 'http://localhost:3000/' + resrc + '/' + data.id;
	console.log(url);
	let req = new Request(url, {
		body: json,
		method: 'PATCH',
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});

	console.log(req);
	return (
		fetch(req)
			.then(errors)
			// receive response
			.then((response) => response.json())
			// throw out junk mail
			.then((data) => {
				return data;
			})
			.catch((error) => {
				alert(
					error +
						'. Rooms should be unique. Links should match the format (https://.../watch?v=Video_ID). '
				);
			})
	);
}
/////////////////////
// GET Requests//
/////////////////////
function fetchRoom() {
	console.log('fetchRoom');

	return (
		fetch('http://localhost:3000/rooms')
			//deserialize js to return objects
			.then((response) => response.json())
			//extract data from array of objects
			.then((data) => data)
	);
}

function fetchPlaylist(resrc) {
	console.log('fetchPlaylist');

	return (
		fetch('http://localhost:3000/playlists/' + resrc)
			//deserialize js to return objects
			.then((response) => response.json())
			//extract data from array of objects
			.then((data) => data)
	);
}

function fetchUser(resrc) {
	console.log('fetchUser');

	fetch('http://localhost:3000/' + resrc)
		//deserialize js to return objects
		.then((response) => response.json())
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

/////////////////
// Fetch IDS //
/////////////////
function fetchRoomByName(name) {
	console.log('fetchRoomID');

	return fetch('http://localhost:3000/rooms')
		.then((response) => response.json())
		.then((data) => {
			for (room of data) {
				if (name == room.name) {
					return room;
				}
			}
		});
}

function fetchPlaylistByRoomID(rid) {
	console.log('fetchPlaylistID');

	return fetch('http://localhost:3000/playlists')
		.then((response) => response.json())
		.then((data) => {
			for (playlist of data) {
				if (rid == playlist.room_id) {
					return playlist;
				}
			}
		});
}
