const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    weight: { type: Number },
    grades: [{type: Schema.Types.ObjectId, ref: 'Grade'}]
});
  
const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;