const { Router } = require("express");
const router = Router();
const pool = require("../database/database.js"); // Enables querying w/ Postgres
const e = require("express");

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

// Update
router.put("/:id", async (req, res) => {
	try {
		// Get the todo id from req.params
		const { id } = req.params;

		// Get the new todo information
		const { todo } = req.body;

		// Make a query to Postgres to update the given todo_id with the new information.
		const updateTodo = await pool.query("UPDATE todo SET todo = $1 WHERE todo_id = $2", [todo, id]);

		// Return the updated todo json data
		res.json(todo);
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
