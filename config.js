module.exports = {
	web: {
		title: "SimpManager",
		port: 2000
	},
	pgsql: {
		user: "postgres",
		host: "localhost",
		database: "simpmanager",
		password: "",
		port: 5432
	},
	validation: {
		password: {
			min_length: 3,
			max_length: 256
		}
	},
	secrets: require("./secrets"),
	session_length:  1000 * 60 * 60
}
