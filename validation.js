const config = require("./config");

validateEmail = (email) => {
	if (!email) {
		return "An email must be provided!";
	}
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let valid = re.test(String(email).toLowerCase());	
	if (!valid) {
		return "The provided email is invalid!";
	}
}

validatePassword = (password) => {
	if (password.length < config.validation.password.min_length) {
		return `Password must be ${config.validation.password.min_length} characters or more!`;
	}
	if (password.length > config.validation.password.max_length) {
		return `Password must be ${config.validation.password.max_length} charaters or less!`;
	}
}

module.exports = {
	validateEmail,
	validatePassword
}
