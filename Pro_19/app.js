const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/student'); // Assuming the schema is in models/student.js
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // If you want to serve static CSS

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/student', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB")).catch(err => console.error(err));

// c) Insert initial documents (insert once)
app.get('/insert', async (req, res) => {
  const data = [
    { Name: 'ABC', Roll_No: 111, WAD_Marks: 25, CC_Marks: 25, DSBDA_Marks: 25, CNS_Marks: 25, AI_marks: 25 },
    { Name: 'XYZ', Roll_No: 112, WAD_Marks: 10, CC_Marks: 35, DSBDA_Marks: 22, CNS_Marks: 45, AI_marks: 30 },
    { Name: 'PQR', Roll_No: 113, WAD_Marks: 30, CC_Marks: 30, DSBDA_Marks: 15, CNS_Marks: 20, AI_marks: 25 },
    { Name: 'MNO', Roll_No: 114, WAD_Marks: 40, CC_Marks: 45, DSBDA_Marks: 27, CNS_Marks: 30, AI_marks: 28 },
  ];
  await Student.insertMany(data);
  const students = await Student.find();
  res.send("Inserted initial documents.");
});

// d) Count and list all documents
app.get('/all', async (req, res) => {
  const students = await Student.find();
  res.render('table', { students, count: students.length });
});

// e) Students with DSBDA > 20
app.get('/dsbda', async (req, res) => {
  const students = await Student.find({ DSBDA_Marks: { $gt: 20 } });
  res.render('table', { students, count: students.length });
});

// f) Update marks of specified student (by name query param)
app.get('/update/:name', async (req, res) => {
  const name = req.params.name;
  await Student.updateOne({ Name: name }, {
    $inc: {
      WAD_Marks: 10,
      CC_Marks: 10,
      DSBDA_Marks: 10,
      CNS_Marks: 10,
      AI_marks: 10
    }
  });
  const students = await Student.find({ Name: name });
  res.render('table', {  students, count: students.length });
});

// g) Students with >25 in all subjects
app.get('/all25', async (req, res) => {
  const students = await Student.find({
    WAD_Marks: { $gt: 25 },
    CC_Marks: { $gt: 25 },
    DSBDA_Marks: { $gt: 25 },
    CNS_Marks: { $gt: 25 },
    AI_marks: { $gt: 25 }
  });
  res.render('table', { students, count: students.length });
});

// h) Students with <40 in both WAD (Maths) and CNS (Science)
app.get('/less40', async (req, res) => {
  const students = await Student.find({
    WAD_Marks: { $lt: 40 },
    CNS_Marks: { $lt: 40 }
  });
  res.render('table', {students, count: students.length });
});

// i) Remove student by name
app.get('/delete/:name', async (req, res) => {
  const name = req.params.name;
  await Student.deleteOne({ Name: name }).then(()=>{alert("Deleted successfully")}).catch((err)=>{alert("Error deleting student")});
  
  res.render('table', {students, count: students.length });
});


// j) Display in tabular format
app.get('/table', async (req, res) => {
  const students = await Student.find();
  res.render('table', { students, count: students.length });
});

// Home page with buttons
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
