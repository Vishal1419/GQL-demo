const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const natureSchema = new Schema({
  name: String,
  isSystemGenerated: Boolean,
});

module.exports = mongoose.model('Nature' ,natureSchema);
