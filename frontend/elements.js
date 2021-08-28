function buildTheater(src) {
	deleteElementByID('theater');

	let parent = document.getElementById('main');
	let element = document.createElement('div');
	element.className = 'container';
	element.id = 'theater';
	let iframe = document.createElement('iframe');
	iframe.src = src;
	iframe.className = 'movie';
	iframe.id = 'movie';
	element.appendChild(iframe);
	parent.appendChild(element);
}

function deleteElementByID(id) {
	let element = document.getElementById(id);
	if (element) element.parentNode.removeChild(element);
}

function updateUserName() {
	document.getElementById('user name').innerHTML =
		'User: ' + session.username;
}

function updateRoom() {}

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
	formaddEventListener('users');
}

function addRow(n, rs, t, b, l) {
	const table = document.getElementById(t);
	const span1 = document.createElement('span');
	const span2 = document.createElement('span');
	const body = document.getElementById(b);
	const r = table.insertRow();
	r.className = 'tableRow';
	r.id = rs + 'tableRow';
	if (l != undefined) {
		c1 = r.insertCell(0);
		c1.className = 'tableCell';
		c1.id = rs + 'tableCell';
		span1.appendChild(document.createTextNode(n));
		c1.appendChild(span1);
		c2 = r.insertCell(1);
		c2.className = 'tableCell';
		c2.id = rs + 'tableCell';

		span2.appendChild(document.createTextNode(l));
		c2.appendChild(span2);
		r.addEventListener('click', function () {
			roomClicked(n);
		});
	} else {
		c1 = r.insertCell(0);
		c1.className = 'tableCell';
		c1.id = rs + 'tableCell';

		span1.appendChild(document.createTextNode(n));
		c1.appendChild(span1);
	}

	body.appendChild(r);
}

function buildSongForm() {
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
	input.setAttribute('name', 'name');
	input.setAttribute('placeholder', 'Paste Youtube Link Here');
	// create a submit button
	let s = document.createElement('button');
	s.setAttribute('type', 'submit');
	s.setAttribute('value', 'Submit');
	s.innerText = ' >';

	//
	form.appendChild(input);
	form.appendChild(s);
	formDiv.appendChild(form);
	parent.appendChild(formDiv);
	formaddEventListener('songs');
}

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

async function renderRoom() {
	console.log('render');
	console.log('rid: ' + session.roomID);
	console.log('pid: ' + session.playlistID);
	buildTheater();
	buildPlaylist()
		.then(buildSongForm())
		.then(fetchPlaylist('playlists/' + session.playlistID));
}
