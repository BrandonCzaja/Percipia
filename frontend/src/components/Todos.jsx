import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo.jsx";

const Todos = () => {
	// Create state for the list of todos. Set to an empty array as the default value
	const [todos, setTodos] = useState([]);
	console.log(`Todos.jsx Todos: ${todos}`);

	// Delete a Todo
	const deleteTodo = async (id) => {
		try {
			// Get todo for deletion by id
			const todo = await fetch(`http://localhost:3000/todos/${id}`, {
				method: "DELETE"
			});

			// Returns all remaining todos
			setTodos(todos.filter((todo) => todo.todo_id !== id));
		} catch (error) {
			console.error(error.message);
		}
	};

	// Grab todos from the backend
	const getTodos = async () => {
		try {
			// Make a fetch request to the backend to get the todos
			const todos = await fetch("http://localhost:3000/todos");

			// Save todos json data
			const data = await todos.json();
			console.log(data);

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
								<EditTodo update={todo} />
							</td>
							<td>
								<button onClick={() => deleteTodo(todo.todo_id)} className="btn btn-danger">
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default Todos;
