const routes = require('express').Router();
const queries = require("../../queries");

routes.post("/register", queries.register);
routes.get("/session", queries.getSession);
routes.post("/session", queries.login);
routes.delete("/session", queries.logout);

routes.post("/password", queries.createPassword);

module.exports = routes;
