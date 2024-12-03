const mongoose = require('mongoose');

const courseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    instructor: { type: String, required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }],  // Enrolled students
    assignments: [{ type: Schema.Types.ObjectId, ref: 'Assignment' }]  // Assignments for this course
  });
  
  const Course = mongoose.model('Course', courseSchema);
  module.exports = Course;