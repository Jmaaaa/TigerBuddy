const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },  
    score: { type: Number, required: true },
    feedback: { type: String },
  });
  

  const Grade = mongoose.model('Grade', gradeSchema);
  module.exports = Grade;