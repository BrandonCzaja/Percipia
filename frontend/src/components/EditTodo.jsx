import React, { useState } from "react";

const EditTodo = ({ update }) => {
	console.log(update);

	// Set todo state to the prop update from Todo.jsx
	const [todo, setTodo] = useState(update.todo);

	// Update Todo
	const updateTodo = async (e) => {
		e.preventDefault();
		try {
			const body = { todo };

			const response = await fetch(`http://localhost:3000/todos/${update.todo_id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body)
			});

			window.location = "/";
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<>
			{/* Table Button */}
			<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${update.todo_id}`}>
				Edit
			</button>

			<div
				className="modal fade"
				id={`id${update.todo_id}`}
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
				onClick={() => {
					setTodo(update.todo);
				}}>
				<div className="modal-dialog">
					<div className="modal-content">
						{/* Modal Header */}
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Edit Todo
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={() => {
									setTodo(todo.todo);
								}}></button>
						</div>

						{/* Modal Body - State updates as I type*/}
						<div className="modal-body">
							<input type="text" className="form-control" value={todo} onChange={(e) => setTodo(e.target.value)} />
						</div>

						{/* Modal Footer */}
						<div className="modal-footer">
							<button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={(e) => updateTodo(e)}>
								Edit
							</button>

							<button
								type="button"
								className="btn btn-danger"
								data-bs-dismiss="modal"
								onClick={() => {
									setTodo(update.todo);
								}}>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditTodo;
