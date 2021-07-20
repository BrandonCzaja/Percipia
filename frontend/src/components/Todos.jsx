import React, { useState, useEffect } from "react";

const Todos = () => {
	// Create state for the list of todos. Set to an empty array as the default value
	const [todos, setTodos] = useState([]);

	// Grab todos from the backend
	const getTodos = async () => {
		try {
			// Make a fetch request to the backend to get the todos
			const todos = await fetch("http://localhost:3000/todos");

			// Save todos json data
			const data = await todos.json();

			// Set todos state to the backend json data
			setTodos(data);
		} catch (error) {
			console.error(error.message);
		}
	};

	// Run getTodos whenever the page reloads
	useEffect(() => {
		getTodos();
	}, []);

	return (
		<>
			<h1>Todos</h1>

			{/* Display Todos in a table */}
			<table className="table table-striped">
				{/* Column Titles */}
				<thead>
					<tr>
						<th scope="col">Todo</th>
						<th scope="col">Date</th>
						<th scope="col">Edit</th>
						<th scope="col">Delete</th>
					</tr>
				</thead>

				{/* Map over todo data and produce a data cell <td> for each to property along with buttons for Edit and Delete  */}
				<tbody>
					{todos.map((todo) => (
						<tr key={todo.todo_id}>
							<td>{todo.todo}</td>
							<td>{todo.created_at}</td>
							<td>
								<button>Edit</button>
							</td>
							<td>
								<button>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default Todos;
