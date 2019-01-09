const mongoose = require('mongoose');

const Nature = require('../models/nature');
const natures = require('./seed-data/natures.json').map(nature => ({
  ...nature,
  _id: mongoose.Types.ObjectId(`EFT${nature._id}`.padStart(12, 0)),
}));

module.exports = {
  seed: (callback) => {
    Nature.insertMany(natures, (err, result) => {
      callback(null, result);
    });
  }
}
