var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postSchema = new Schema ({
  comment: String,
  poster: {type: Schema.Types.ObjectId, ref: 'User'},
  createdAt: {type: Date, default: Date.now},
  status: {
    type: String,
    enum: ['Accepted', 'Rejected', 'Interview', 'Waitlisted']
  },
  method: {
    type: String,
    enum: ['Mail', 'E-mail', 'Website', 'Phone']
  },
  admitSeason: {
    type: String,
    // Jim says to change this to a function before Fall of 2018
    enum: ['Fall 2017', 'Spring 2018', 'Fall 2018'],
    default: 'Fall 2017'
  },
  program: String
});

var schoolSchema = new Schema({
  schoolId: Number,
  name: String,
  schoolWebsite: String,
  posts: [postSchema]
});

module.exports = mongoose.model('School', schoolSchema);
