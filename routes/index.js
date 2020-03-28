const routes = require('express').Router();
const api = require("./api");
const bodyParser = require("body-parser");

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({extended: true}));

routes.get("/", (req, res) => {
	res.render("index");
})

routes.use("/api", api);

module.exports = routes;
