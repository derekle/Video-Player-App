document.addEventListener("DOMContentLoaded", function () {
	buildTables("users");
	buildTables("rooms");

	document
		.getElementById("usersForm")
		.addEventListener("submit", function (event) {
			handleForm(event, "users");
		});
	document
		.getElementById("roomsForm")
		.addEventListener("submit", function (event) {
			handleForm(event, "rooms");
		});
});

function buildTables(resrc) {
	fetch("http://localhost:3000/" + resrc)
		//deserialize js to return objects
		.then((result) => result.json())
		//extract data from array of objects
		.then((data) => {
			console.log(data);
			for (obj of data) {
				const table = document.getElementById(resrc + "Table");
				const row = table.insertRow();
				if (resrc == "rooms") {
					cell1 = row.insertCell(0);
					cell2 = row.insertCell(1);

					cell1.innerText = obj.name;
					cell2.innerText = obj.users.length;
				} else {
					row.innerText = obj.name;
					console.log(obj.name);
				}
			}
		});
}

async function handleForm(ev, resrc) {
	// stop page from refreshing on submit
	ev.preventDefault();
	let myForm = ev.target;
	let fd = new FormData(myForm);
	console.log(fd);
	for (let key of fd.keys()) {
		console.log(key, fd.get(key));
	}
	let json = await converFD2JSON(fd);
	let url = "http://localhost:3000/" + resrc;
	console.log(url);
	let req = new Request(url, {
		body: json,
		method: "POST",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	});

	fetch(req)
		.then((result) => result.json())
		.then((data) => {
			console.log("response from server");
			console.log(data.name);
			console.log(resrc + "Table");
			if (resrc == "rooms") {
				console.log(data.users.length);
				addRow(data.name, resrc + "Table", data.users.length);
			} else {
				addRow(data.name, resrc + "Table");
			}
		});

	function converFD2JSON(formData) {
		let obj = {};
		for (let key of formData.keys()) {
			obj[key] = formData.get(key);
		}
		return JSON.stringify(obj);
	}
}
function addRow(x, y, z) {
	let t = document.getElementById(y);
	console.log(t);
	let r = t.insertRow();
	let c1 = r.insertCell(0);
	if (z != undefined) {
		console.log("z is " + z);
		let c2 = r.insertCell(1);
		c2.innerHTML = z;
	}
	c1.innerHTML = x;
}
