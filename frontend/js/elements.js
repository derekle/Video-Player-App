/* All  functions are for manipulating dom elements only. */

//ultimate function for rendering the room
async function renderRoom() {
	// if the room has a current song assigned, build the player. (dont show player if nothing in playlist)
	if (session.currentSong) {
		await buildPlayer(session.currentSong);
	}
	loadYTAPI();
	buildPlaylist();
	buildSongForm();
	modifyTable('playlist', session.playlist);
}

// function to delete an element by the id in the argument. if the id exists on the dom, it will be destroyed
function deleteElementByID(id) {
	let element = document.getElementById(id);
	if (element) element.parentNode.removeChild(element);
}

// show the current user's name
function updateDOMUserName() {
	document.getElementById('user name').innerHTML =
		'User: ' + session.username;
}

// show the current room name
function updateDOMRoomName() {
	document.getElementById('room-name').innerHTML =
		'Room: ' + session.roomname;
}

// FORMS //

// function for building the form for taking in youtube links
function buildSongForm() {
	console.log('buildSongForm');
	deleteElementByID('songsFormDiv');

	//get main div
	let parent = document.getElementById('main');
	//create form div
	let formDiv = document.createElement('div');
	formDiv.id = 'songsFormDiv';

	//build form tag
	let form = document.createElement('form');
	form.id = 'songsForm';
	form.className = 'form';

	let input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.setAttribute('name', 'source');
	input.setAttribute('placeholder', 'Paste Youtube Link Here');

	let hidden = document.createElement('input');
	hidden.setAttribute('type', 'hidden');
	hidden.setAttribute('name', 'playlist_id');
	hidden.setAttribute('value', session.playlistID);
	// create a submit button
	let s = document.createElement('button');
	s.setAttribute('type', 'submit');
	s.setAttribute('value', 'Submit');
	s.innerText = ' >';

	//
	form.appendChild(input);
	form.appendChild(hidden);
	form.appendChild(s);
	formDiv.appendChild(form);
	parent.appendChild(formDiv);
	formaddEventListener('songs', 'post');
}
// function to build the form for entering user name
function buildUsersForm() {
	deleteElementByID('usersFormDiv');
	//get main div
	let parent = document.getElementById('main');
	//create form div
	let formDiv = document.createElement('div');
	formDiv.id = 'usersFormDiv';
	//build form tag
	let form = document.createElement('form');
	form.id = 'usersForm';
	form.className = 'form';
	//create input
	let input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.setAttribute('name', 'name');
	input.setAttribute('placeholder', 'Name');

	let hidden = document.createElement('input');
	hidden.setAttribute('type', 'hidden');
	hidden.setAttribute('name', 'room_id');
	hidden.setAttribute('value', session.roomID);
	// create a submit button
	let s = document.createElement('button');
	s.setAttribute('type', 'submit');
	s.innerText = ' Create';
	//
	form.appendChild(input);
	form.appendChild(hidden);
	form.appendChild(s);
	formDiv.appendChild(form);
	parent.appendChild(formDiv);
}

// VIDEO PLAYER //
// function to build the player container, takes a source url string as an arugment
function buildPlayer(src) {
	console.log('buildplayer');
	deleteElementByID('container');
	let parent = document.getElementById('main');
	let containerdiv = document.createElement('div');
	containerdiv.className = 'container';
	containerdiv.id = 'container';
	let iframe = document.createElement('iframe');
	iframe.src = src;
	iframe.id = 'player';
	iframe.title = 'YouTube video player';
	containerdiv.appendChild(iframe);
	parent.appendChild(containerdiv);
}

// TABLES //
//function for building the playlist header and root node for the table
async function buildPlaylist() {
	console.log('buildPlaylist');
	deleteElementByID('playlistsBody');
	deleteElementByID('playlistsTable');

	let parent = document.getElementById('main');
	let label = document.createElement('table');
	label.id = 'playlistsTable';
	let h1 = document.createElement('thead');
	h1.setAttribute('colspan', 2);
	hr = h1.insertRow();
	hr.insertAdjacentHTML('afterbegin', '<th>Playlist</th>');
	//
	let table = document.createElement('tbody');
	table.id = 'playlistsBody';

	//
	h1.appendChild(hr);
	label.appendChild(h1);
	table.appendChild(label);
	parent.appendChild(table);
}
// function for updating the tables.
async function modifyTable(resrc, data) {
	console.log(data);
	let count = 1;

	if (resrc == 'rooms') {
		if (isIterable(data)) {
			for (obj of data) {
				addRow(
					obj.name,
					'rooms',
					'roomsTable',
					'roomsBody',
					count,
					obj.users.length
				);
				count++;
			}
		} else {
			addRow(
				data.name,
				'rooms',
				'roomsTable',
				'roomsBody',
				count,
				data.users.length
			);
			count++;
		}
	}
	if (resrc == 'users') {
		session.username = data.name;
		session.userID = data.id;
		updateDOMUserName();
		deleteElementByID('usersForm');
		renderRoom();
	}
	if (resrc == 'playlist') {
		for (song of data.songs) {
			index = data.songs.indexOf(song);
			index++;
			addRow(
				index,
				'playlists',
				'playlistsTable',
				'playlistsBody',
				count,
				song.source
			);
			count++;
		}
	}
	if (resrc == 'songs') {
		console.log('songs');
		const first = await isFirstSong();
		await session.playlist.songs.push(data);
		index = session.playlist.songs.indexOf(data);
		index++;
		if (first) {
			console.log('first Song');
			formatURL(session.playlist.songs[0].source);
			renderRoom();
		} else {
			addRow(
				index,
				'playlists',
				'playlistsTable',
				'playlistsBody',
				count,
				data.source
			);
		}
	}
}
/* function to add rows in the tables. takes up to 6 arguments
n-first column
rs-resource
t - classname for table
b - classname for tbody
c - a count integer for playlists
l - a length integer for number of users in a room*/
function addRow(n, rs, t, b, c, l) {
	const table = document.getElementById(t);
	const span1 = document.createElement('span');
	const span2 = document.createElement('span');
	const body = document.getElementById(b);
	const r = table.insertRow();
	r.id = rs + 'tableRow' + c;
	r.className = rs + 'tableRow';
	// code for if the resource is for the playlist table (doesnt have a length or user count associated with it)
	if (l != undefined) {
		if (
			l.toString().replace('watch?v=', 'embed/') ==
			session.currentSong
		) {
			r.className = 'currentSong';
		}
		c1 = r.insertCell(0);
		c1.className = rs + 'tableCell';
		c1.id = rs + 'tableCell' + c;
		span1.appendChild(document.createTextNode(n));
		c1.appendChild(span1);
		c2 = r.insertCell(1);
		c2.className = rs + 'tableCell';
		c2.id = rs + 'tableCell' + c;

		span2.appendChild(document.createTextNode(l));
		c2.appendChild(span2);
		if (rs == 'rooms') {
			r.addEventListener('click', function () {
				roomClicked(n);
			});
		} else if (rs == 'playlists') {
			r.addEventListener('click', function () {
				songClicked(this);
			});
		}
	}
	// code for if the resource is for the room table
	else {
		c1 = r.insertCell(0);
		c1.className = rs + 'tableCell';
		c1.id = rs + 'tableCell' + c;

		span1.appendChild(document.createTextNode(n));
		c1.appendChild(span1);
	}

	// append the row to the tbody
	body.appendChild(r);
}
