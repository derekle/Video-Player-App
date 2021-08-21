document.addEventListener('DOMContentLoaded', function () {
	//get json from api endpoint
	fetch('http://localhost:3000/users')
		//deserialize js to return objects
		.then((result) => result.json())
		//extract data from array of objects
		.then((data) => {
			const userDiv = document.querySelector('td.userList');
			for (user of data) {
				const userhtml = document.createElement('tr');
				userhtml.innerText = user.name;
				userDiv.appendChild(userhtml);
				console.log(user.name);
			}
		});
});
document.addEventListener('DOMContentLoaded', function () {
	//get json from api endpoint
	fetch('http://localhost:3000/rooms')
		//deserialize js to return objects
		.then((result) => result.json())
		//extract data from array of objects
		.then((data) => {
			console.log(data);
			const roomDiv = document.querySelector('td.roomList');
			for (room of data) {
				const roomhtml = document.createElement('tr');
				roomhtml.innerText = room.name;
				roomDiv.appendChild(roomhtml);
				console.log(room.name);
			}
		});
});
