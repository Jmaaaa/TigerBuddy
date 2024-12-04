const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: { type: String, required: true, unique: true},
    code: { type: String, required: true, unique: true },
    description: { type: String },
    instructor: { type: String, required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }],  // Enrolled students
    assignments: [{ type: Schema.Types.ObjectId, ref: 'Assignment' }]  // Assignments for this course
  });
  

  const Course = mongoose.model('Course', courseSchema);
  module.exports = Course;