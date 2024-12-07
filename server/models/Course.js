const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: { type: String, required: true, unique: true},
  code: { type: String, required: true, unique: true },
  instructor: { type: String, required: true },
  hours: { type: Number },
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  homeInfo: { 
    overview: {
      description: { type: String},
      keyTopics: {type: String},
      expectedOutcomes: {type: String}
    },
    contact:{
      phone: {type: String},
      email: {type: String},
      officeHours: { type: String }
    }
  },
  announcements: [{
    name: { type: String, required: true },
    description: { type: String },
    date: { type: Date }
  }],
  cModules: [{ 
    name: { type: String, required: true },
    description: { type: String },
    materials: [{
      matName: {type: String},
      type: {type: String}
    }],
  }],
  assignments: [{ type: Schema.Types.ObjectId, ref: 'Assignment' }]
});


const Course = mongoose.model('Course', courseSchema);
module.exports = Course;