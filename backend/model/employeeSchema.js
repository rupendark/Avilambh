const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    Emp_Id: { type: String, required: true,unique: true },
    Name: { type: String, required: true },
    Role: { type: String, required: true },
    Contact_No: { type: String, required: true } 
}, { collection: "Employee" }); // Explicitly reference the collection name

const Employee = mongoose.model("Employee", employeeSchema,'Employee');

module.exports = Employee;