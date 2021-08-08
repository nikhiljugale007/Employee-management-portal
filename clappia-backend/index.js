require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
let bodyParser = require("body-parser");
const cors = require("cors");

let app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

mongoose
	.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((x) => {
		console.log(
			`Connected to Mongo! Database name: "${x.connections[0].name}"`
		);
	})
	.catch((err) => {
		console.error("Error connecting to mongo", err);
	});

const empRoutes = require("./routes/emp_route");
app.use("/api", empRoutes);

app.get("/", (req, res) => {
	res.send("Listening");
});

var port = process.env.PORT || 4000;
app.listen(port, function () {
	console.log("Server started at " + port);
});
