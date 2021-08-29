// Figure out if data returned is iterable - return boolean//
const isIterable = (value) => {
	return Symbol.iterator in Object(value);
};

// Function to convert form data into json format
function convert(fd) {
	let obj = {};
	for (let key of fd.keys()) {
		obj[key] = fd.get(key);
	}
	return JSON.stringify(obj);
}

// Function to find out if the playlist is getting it's first song
function isFirstSong() {
	return session.playlist.length == 0;
}
