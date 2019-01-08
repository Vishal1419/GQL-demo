const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const effectSchema = new Schema({
  name: String,
  isSystemGenerated: Boolean,
});

module.exports = mongoose.model('Effect' ,effectSchema);
