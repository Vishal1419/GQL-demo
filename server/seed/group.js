const mongoose = require('mongoose');

const Group = require('../models/group');
const groups = require('./seed-data/groups.json').map(group => ({
  ...group,
  _id: mongoose.Types.ObjectId(`GRP${group._id}`.padStart(12, 0)),
  parentId: mongoose.Types.ObjectId(`GRP${group.parentId}`.padStart(12, 0)),
  effectIds: group.effectIds.map(effectId =>
    mongoose.Types.ObjectId(`EFT${effectId}`.padStart(12, 0))
  ),
  natureId: mongoose.Types.ObjectId(`NAT${group.natureId}`.padStart(12, 0)),
}));

module.exports = {
  seed: (callback) => {
    Group.insertMany(groups, (err, result) => {
      callback(err, result);
    });
  }
}
