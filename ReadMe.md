# Todo App

Todo App is a full stack application using the PERN (PostgreSQL, Express, React, Node) stack to enable users to create, read, update, and delete todos.

# Overview

## Running Application

The application runs on the user's local computer.

-   Start server

```javascript
npm run start
```

-   Start client

```js
npm start
```

## Deploying

For deploying the project I recommend Heroku: <link>https://devcenter.heroku.com/articles/git</link>. Because the application only runs on a local machine, the entire project is under one GitHub repo. To deploy to Heroku you will have to separate the two ends into two different repos.

## Additional Packages Used

-   Bootstrap
    -   Update Modal and styling of Todos display.
-   CORS
    -   Handling Cross-Origin Resource Sharing to restrict unauthorized domains.
-   PG
    -   Connecting to and making queries from PostgreSQL database.

# Routes

For a quick reference to see how the routes are setup, please see below. For legibility, all comments have been removed from the examples. See `/backend/controllers/todoRoutes.js` for comments.

## Index - Get all Todos

```javascript
router.get("/", async (req, res) => {
	try {
		const allTodos = await pool.query("SELECT * FROM todo");

		res.json(allTodos.rows);
	} catch (error) {
		console.error(error.message);
	}
});
```

## Create - Create a Todo

```javascript
router.post("/", async (req, res) => {
	try {
		const { todo } = req.body;

		const newTodo = await pool.query("INSERT INTO todo (todo) VALUES($1) RETURNING *", [todo]);

		res.json(newTodo.rows[0]);
	} catch (error) {
		console.error(error.message);
	}
});
```

## Update - Edit a Todo

```javascript
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const { todo } = req.body;

		const updateTodo = await pool.query("UPDATE todo SET todo = $1 WHERE todo_id = $2", [todo, id]);

		res.json("Todo was updated!");
	} catch (error) {
		console.error(error.message);
	}
});
```

## Delete - Delete a Todo from the rendered list and database

```javascript
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

		res.json("Todo was deleted");
	} catch (error) {
		console.error(error.message);
	}
});
```

## Show - Get an individual Todo

```javascript
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

		res.json(todo.rows[0]);
	} catch (error) {
		console.error(error.message);
	}
});
```
