const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },  
    assignment: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
    file:{ type: String },
    comments: [{ type: String }],
  });
  
  const Submission = mongoose.model('Grade', submissionSchema);
  module.exports = Submission;