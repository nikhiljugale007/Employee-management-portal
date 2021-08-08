const express = require("express");
const router = express.Router();
const Employee = require("../model/emp_model");

// router.get("/", async (req, res) => {
// 	var pageNo = parseInt(req.query.pageNo);
// 	var size = parseInt(req.query.size);

// 	var query = {};
// 	if (pageNo < 0 || pageNo === 0) {
// 		return res.json({
// 			status: 500,
// 			message: "invalid page number, should start with 1",
// 		});
// 	}
// 	query.skip = size * (pageNo - 1);
// 	query.limit = size;

// 	try {
// 		const employees = await Employee.find({}, {}, query);
// 		res.json({
// 			status: 200,
// 			message: "success",
// 			data: employees,
// 		});
// 	} catch (err) {
// 		res.json({
// 			status: 500,
// 			message: err.message,
// 		});
// 	}
// });

router.get("/search", async (req, res) => {
	var username = req.query.username;

	var pageNo = parseInt(req.query.pageNo);
	var size = parseInt(req.query.size);

	var query = {};
	if (pageNo < 0 || pageNo === 0) {
		return res.json({
			status: 500,
			message: "invalid page number, should start with 1",
		});
	}
	query.skip = size * (pageNo - 1);
	query.limit = size;

	try {
		const employees = await Employee.find(
			{ emp_name: { $regex: username, $options: "i" } },
			{},
			query
		);
		res.json({
			status: 200,
			message: "success",
			data: employees,
		});
	} catch (err) {
		res.json({
			status: 500,
			message: err.message,
		});
	}
});

// router.get("/:id", getEmployee, (req, res) => {
// 	res.json({
// 		status: 200,
// 		message: "success",
// 		data: res.employee,
// 	});
// });

router.post("/", async (req, res) => {
	const employee = new Employee({
		emp_name: req.body.emp_name,
		emp_salary: req.body.emp_salary,
		emp_gender: req.body.emp_gender,
		emp_team: req.body.emp_team,
		emp_address: req.body.emp_address,
	});

	try {
		const newEmployee = await employee.save();
		res.json({
			status: 200,
			message: "success",
			data: newEmployee,
		});
	} catch (err) {
		res.json({
			status: 500,
			message: err.message,
		});
	}
});

router.patch("/:id", getEmployee, async (req, res) => {
	if (req.body.emp_name != null) {
		res.employee.emp_name = req.body.emp_name;
	}
	if (req.body.emp_salary != null) {
		res.employee.emp_salary = req.body.emp_salary;
	}
	if (req.body.emp_gender != null) {
		res.employee.emp_gender = req.body.emp_gender;
	}
	if (req.body.emp_team != null) {
		res.employee.emp_team = req.body.emp_team;
	}
	if (req.body.emp_address != null) {
		res.employee.emp_address = req.body.emp_address;
	}

	try {
		const updateEmployee = await res.employee.save();
		res.json({
			status: 200,
			message: "success",
			data: updateEmployee,
		});
	} catch (err) {
		res.json({
			status: 500,
			message: err.message,
		});
	}
});

router.delete("/:id", getEmployee, async (req, res) => {
	try {
		await res.employee.remove();
		res.json({
			status: 200,
			message: "success",
		});
	} catch (err) {
		res.json({
			status: 500,
			message: err.message,
		});
	}
});

async function getEmployee(req, res, next) {
	try {
		employee = await Employee.findById(req.params.id);
		if (employee == null) {
			return res.json({
				status: 404,
				message: "Employee not found",
			});
		}
	} catch (err) {
		return res.json({ status: 500, message: err.message });
	}
	res.employee = employee;
	next();
}

module.exports = router;
