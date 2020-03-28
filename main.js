const express = require('express');
const app = express();
const routes = require("./routes");
const config = require("./config");

app.set("view engine", "ejs");
app.set("views", "./views")

app.use("/", routes);

app.listen(config.web.port, () => {
  console.log(`${config.web.title} listening on port ${config.web.port}!`);
});
