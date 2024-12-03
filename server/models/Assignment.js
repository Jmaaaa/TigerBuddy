const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },  // Reference to the course the assignment belongs to
    grades: [{ type: Schema.Types.ObjectId, ref: 'Grade' }]  // Grades for this assignment (one for each student)
});
  
const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;