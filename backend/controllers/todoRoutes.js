const { Router } = require("express");
const router = Router();
const pool = require("../database/database.js"); // Enables querying w/ Postgres

// Index
router.get("/", async (req, res) => {
	try {
		// Grab all the todos from the database
		const allTodos = await pool.query("SELECT * FROM todo");

		// Within the todo object there is a property called rows which contains the todos
		// console.log(allTodos.rows);

		// Return all the todos as json data
		res.json(allTodos.rows);
	} catch (error) {
		console.error(error.message);
	}
});

// Create
router.post("/", async (req, res) => {
	try {
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

// Show
router.get("/:id", async (req, res) => {
	try {
		// Get the id from the req.params
		const { id } = req.params;

		// Get the todo from the table where the todo_id matches the id in req.params
		const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

		// Return the individual todo
		res.json(todo.rows[0]);
	} catch (error) {
		console.error(error.message);
	}
});

module.exports = router;
