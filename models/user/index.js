const config = require("../../config");
const Pool = require('pg').Pool;
const pool = new Pool(config.pgsql);
const bcrypt = require('bcrypt');

hashPassword = (password, cb) => {
	bcrypt.hash(password, 10, cb);
}

compareHash = (password, hash, cb) => {
	bcrypt.compare(password, hash, cb);
}

register = (email, password) => {
	return new Promise((resolve, reject) => {
		pool.query("SELECT * FROM users WHERE email = $1", [email], (error, result) => {
			if (error) {
				console.log(error);
				reject("An internal error occurred!");
			} else {
				if (result.rowCount == 0) {
					hashPassword(password, (err, hash) => {
						if (err) {
							console.log(err);
							reject("An internal error occurred!");
						} else {
							pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hash], (error, result) => {
								resolve();
							});
						}
					});
				} else {
					reject("Email already in use!");
				}
			}
		});
	});
}

login = (email, password) => {
	return new Promise((resolve, reject) => {
		pool.query("SELECT * FROM users WHERE email = $1", [email], (error, result) => {
			if (error) {
				console.log(error);
				reject("An internal error occurred!");
			} else {
				if (result.rowCount == 0) {
					reject("Email not registered!");
				} else {
					var hashedPassword = result.rows[0].password;
					compareHash(password, hashedPassword, (error, result) => {
						if (error) {
							console.log(error);
							reject("An internal error occurred!");
						} else {
							if (result) {
								resolve();
							} else {
								reject("Incorrect password!");
							}
						}
					});
				}
			}
		});
	});
}

module.exports = {
	register,
	login
}
