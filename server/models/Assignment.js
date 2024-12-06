const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    weight: { type: Number },
    grades: [{
        score: { type: Number },
        student: { type: Schema.Types.ObjectId, ref: 'User' },
        feedback: { type: String },
        submission: {
            file: { type: String},
            comments: [{ type: String }]
        }
    }]
});
  
const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;