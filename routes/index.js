const routes = require('express').Router();
const api = require("./api");
const bodyParser = require("body-parser");
const session = require("express-session");
const config = require("../config");

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({extended: true}));

routes.use(session({
	secret: config.secrets.session_key,
	resave: false,
	saveUninitialized: true,
	maxAge: config.session_length
}));

routes.use((req, res, next) => {
	if (!req.url.includes("dashboard") && req.session.email) {
		res.redirect("dashboard");
	} else {
		next();
	}
});

routes.get("/", (req, res) => {
	res.render("index", {title: config.web.title});
})

routes.get("/register", (req, res) => {
	res.render("register", {title: config.web.title + " - Register"});
})

routes.get("/login", (req, res) => {
	res.render("login", {title: config.web.title + " - Login"});
})

routes.get("/dashboard", (req, res) => {
	res.render("dashboard", {title: config.web.title + " - Dashboard"});
})

routes.use("/api", api);

module.exports = routes;
