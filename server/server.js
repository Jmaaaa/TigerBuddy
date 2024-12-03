require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const assignmentRoutes = require('./routes/assignment');
const courseRoutes = require('./routes/course');
const gradeRoutes = require('./routes/grade');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes (Example)
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/grades', gradeRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});