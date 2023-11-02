const mongoose = require('mongoose');

const presentSchema = mongoose.Schema({
  name: {type: String, required: true},
  link: String,
  additionalInfo: String,
  timesPicked: Number
});


module.exports = mongoose.model('Present', presentSchema)