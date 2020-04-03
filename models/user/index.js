const config = require("../../config");
const Pool = require('pg').Pool;
const pool = new Pool(config.pgsql);

register = (email, password) => {
	return new Promise((resolve, reject) => {
		pool.query("SELECT * FROM users WHERE email = $1", [email], (error, result) => {
			if (result.rowCount == 0) {
				pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password], (error, result) => {
					resolve();
				});
			} else {
				reject("Email already in use!");
			}
		});
	});
}

login = (email, password) => {
	return new Promise((resolve, reject) => {
		pool.query("SELECT * FROM users WHERE email = $1 AND password = $2", [email, password], (error, result) => {
			if (result.rowCount == 0) {
				reject();
			} else {
				resolve();
			}
		});
	})
}

module.exports = {
	register,
	login
}
