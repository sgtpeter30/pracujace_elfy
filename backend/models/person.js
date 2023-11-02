const mongoose = require('mongoose');
const present = require('./present');

const personSchema = mongoose.Schema({
  person: {type: String, required: true},
  submissionDate: Date,
  presentsList: [
    {
      name: {type: String, required: true},
      link: String,
      additionalInfo: String,
      timesPicked: Number
    }
  ]
  // presentsList: Array<present>[],
});

module.exports = mongoose.model('Person', personSchema)