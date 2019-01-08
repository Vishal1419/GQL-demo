const Effect = require('../models/effect');
const db = require('../db');
const effects = require('../schema/dummy-data/effects.json').map(effect => new Effect(effect));

let done = 0;

for(let i = 0; i < effects.length; i++)
{
  effects[i].save((err, result) => {
    done++;
    if(done == effects.length){
      exit();
    }
  });
}

function exit() {
  console.log('effects seeding succeeded');
  db.then(database => database.connection.close());
}