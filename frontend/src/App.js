import "./App.css";
import Todos from "./components/Todos.jsx";
import AddTodo from "./components/AddTodo.jsx";

function App() {
	return (
		<div className="App">
			<AddTodo />
			<Todos />
		</div>
	);
}

export default App;
