// Dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

// Middleware
app.use(express.json()); // Enables access to req.body
app.use(cors()); // Handles requests made from restricted domains

// Landing endpoint
app.get("/", (req, res) => {
	res.json({
		info: "Server works"
	});
});

// Listener
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}.`);
});
