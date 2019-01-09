const mongoose = require('mongoose');

const Effect = require('../models/effect');
const effects = require('./seed-data/effects.json').map(effect => ({
  ...effect,
  _id: mongoose.Types.ObjectId(`EFT${effect._id}`.padStart(12, 0)),
}));

module.exports = {
  seed: (callback) => {
    Effect.insertMany(effects, (err, result) => {
      callback(null, result);
    });
  }
}
