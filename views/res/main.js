function GET(url, cb) {
	fetch("api/" + url, {
		method: "GET",
	}).then(function(res){ return res.json(); }).then(res => {
		cb(res);
	});
}

function API(method, url, data, cb) {
	fetch("api/" + url, {
		method: method,
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	}).then(function(res){ return res.json(); }).then(res => {
		cb(res);
	});
}

function sha512(str) {
	return crypto.subtle.digest("SHA-256", new TextEncoder("utf-8").encode(str)).then(buf => {
		return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
	});
}

function makeID(length) {
	let result = "";
	let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}
