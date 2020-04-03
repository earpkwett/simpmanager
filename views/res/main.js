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
