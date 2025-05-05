const express = require('express');
const mongoose = require('mongoose');
const Employee = require('./models/employee');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/employee_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"));

// Home page: list all employees
app.get('/', async (req, res) => {
  const employees = await Employee.find();
  res.render('index', { employees });
});

// Show form to add new employee
app.get('/add', (req, res) => {
  res.render('add');
});

// Add new employee
app.post('/add', async (req, res) => {
  const { Name, Department, Designation, Salary, Joining_Date } = req.body;
  await Employee.create({ Name, Department, Designation, Salary, Joining_Date });
  res.redirect('/');
});

// Show form to edit employee
app.get('/edit/:name', async (req, res) => {
  const employee = await Employee.findOne({Name: req.params.name});
  res.render('edit', { employee });
});

// Update employee
app.post('/edit/:name', async (req, res) => {
  const { Name, Department, Designation, Salary, Joining_Date } = req.body;
  await Employee.updateOne({ Name, Department, Designation, Salary, Joining_Date });
  res.redirect('/');
});

// Delete employee
app.get('/delete/:name', async (req, res) => {
  await Employee.deleteOne({Name:req.params.name});
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));