// Dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const todoRouter = require("./controllers/todoRoutes");

// Middleware
app.use(express.json()); // Enables access to req.body
app.use(cors()); // Handles requests made from restricted domains

// Router
app.use("/todos", todoRouter);

// Entry point
app.get("/", (req, res) => {
	res.redirect("/todos");
});

// Listener
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}.`);
});
