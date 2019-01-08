const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: String,
  alias: String,
  parentId: String,
  effectIds: String,
  natureId: String,
  isSystemGenerated: Boolean,
  mailing: Boolean,
  contact: Boolean,
  bank: Boolean,
  tax: Boolean,
});

module.exports = mongoose.model('Group' ,groupSchema);
