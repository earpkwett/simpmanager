const User = require("./models/user");
const validation = require("./validation");

register = (req, res) => {
	const {email, password} = req.body;
	let emailValid = validation.validateEmail(email);
	let passwordValid = validation.validatePassword(password);
	if (emailValid) {
		res.json({success: false, error: emailValid});
	} else if (passwordValid) {
		res.json({success: false, error: passwordValid});
	}	else {
		User.register(email, password).then(() => {
			req.session.email = email;
			res.json({success: true});
		}, (error) => {
			res.json({success: false, error: error});
		});
	}
}

getSession = (req, res) => {
	if (req.session.email) {
		res.json({success: true, session: {email: req.session.email}});
	} else {
		res.json({success: false, error: "You are not logged in!"});
	}
}

login = (req, res) => {
	const {email, password} = req.body;
	if (req.session.email) {
		res.json({success: false, error: "You are already logged in!"});
	} else {
		User.login(email, password).then(() => {
			req.session.email = email;
			res.json({success: true});
		}, (error) => {
			res.json({success: false, error: error});
		})
	}
}

logout = (req, res) => {
	if (req.session.email) {
		req.session.destroy();
		res.json({success: true});
	} else {
		res.json({success: false, error: "You are not logged in!"});
	}
}

createPassword = (req, res) => {
	if (req.session.email) {
		const { name, password } = req.body;
		User.resolveID(req.session.email).then((userID) => {
			User.createPassword(userID, name, password).then(() => {
				res.json({success: true});
			}, (error) => {
				res.json({success: false, error: error});
			});
		}, (error) => {
			res.json({success: false, error: error});
		})
	} else {
		res.json({success: false, error: "You are not logged in!"});
	}
}

module.exports = {
	register,
	getSession,
	login,
	logout,
	createPassword
}
