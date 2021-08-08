var mongoose = require("mongoose");

var empSchema = new mongoose.Schema({
	emp_name: {
		type: String,
		required: true,
	},
	emp_salary: {
		type: Number,
		required: true,
	},
	emp_gender: {
		type: String,
		required: true,
	},
	emp_team: {
		type: String,
		required: true,
	},
	emp_address: {
		type: String,
		required: true,
	},
});

empSchema.index({ emp_name: "text" });

module.exports = mongoose.model("Employee", empSchema);
