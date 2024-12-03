const mongoose = require('mongoose');

const gradeSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },  
    assignment: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
    grade: { type: Number, required: true },
    feedback: { type: String },
  });
  
  const Grade = mongoose.model('Grade', gradeSchema);
  module.exports = Grade;