const express = require('express');
const app = express();
const routes = require("./routes");
const config = require("./config");
const fs = require('fs');

app.set("view engine", "ejs");
app.set("views", "./views")


var views = require("path").join(__dirname, './views');
app.get("/res/:name", (req, res) => {
	let file = views + "/res/" + req.params.name;
	fs.access(file, (err) => {
		if (err) {
			res.send("File not found!");
		} else {
			res.sendFile(file);
		}
	});
})

app.use("/", routes);

app.listen(config.web.port, () => {
  console.log(`${config.web.title} listening on port ${config.web.port}!`);
});
