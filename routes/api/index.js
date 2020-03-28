const routes = require('express').Router();
const queries = require("../../queries");

routes.post("/register", queries.register);
routes.post("/session", queries.startSession);
routes.delete("/session", queries.endSession);

module.exports = routes;
