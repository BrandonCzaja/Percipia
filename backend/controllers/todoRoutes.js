const { Router } = require("express");
const router = Router();
const pool = require("../database/database.js"); // Enables querying w/ Postgres

// Create
router.post("/", async (req, res) => {
	try {
		// console.log(req.body);
		// Pull the todo from the req.body
		const { todo } = req.body;
		// Insert into the todo column the todo from req.body. Time stamp will be made automatically
		const newTodo = await pool.query("INSERT INTO todo (todo) VALUES ($1) RETURNING *", [todo]);

		// Return the json data of the the todo that was just created
		res.json(newTodo.rows[0]);
	} catch (error) {
		console.error(error.message);
	}
});

module.exports = router;
