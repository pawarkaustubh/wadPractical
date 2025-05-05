const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  Name: String,
  Department: String,
  Designation: String,
  Salary: Number,
  Joining_Date: Date
});

module.exports = mongoose.model('Employee', employeeSchema);