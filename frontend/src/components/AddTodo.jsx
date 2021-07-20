import React, { useState } from "react";

const AddTodo = () => {
	const [todo, setTodo] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const body = { todo };
			const response = await fetch("http://localhost:3000/todos", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(body)
			});

			window.location = "/";
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<>
			<h1 className="text-center mt-5">Todo List</h1>
			<form onSubmit={handleSubmit} className="d-flex mt-5">
				<input type="text" value={todo.todo} onChange={(e) => setTodo(e.target.value)} placeholder="Add Todo" className="form-control" />
				<button className="btn btn-success">Add Todo</button>
			</form>
		</>
	);
};

export default AddTodo;
