const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },  // Reference to the course the assignment belongs to
});
  
const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;