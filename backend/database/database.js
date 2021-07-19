const Pool = require("pg").Pool;

const pool = new Pool({
	user: "brandonczaja",
	host: "localhost",
	port: 5432,
	database: "percipia"
});

module.exports = pool;
