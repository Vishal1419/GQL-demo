const async = require('async');

const db = require('../db');
const effect = require('./effect');
const nature = require('./nature');
const group = require('./group');

async.parallel(
  [
    (callback) => {
      effect.seed((err, result) => {
        console.log('effect seeding succeeded');
        callback(err, result);
      });
    },
    (callback) => {
      nature.seed((err, result) => {
        console.log('nature seeding succeeded');
        callback(err, result);
      });
    },
  ],
  (err, results) => {
    if (err) { console.log(err); return; }
    group.seed(() => {
      console.log('group seeding succeeded');
      exit();
    });
  }
);

const exit = () => {
  console.log('disconnect database');
  db.then(database => database.connection.close());
}