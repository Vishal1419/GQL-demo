const Group = require('../models/group');
const db = require('../db');
const groups = require('../schema/dummy-data/groups.json').map(group => new Group({
  ...group,
  effectIds: group.effectIds.map(effectId => {
    db.
  }),
}));

let done = 0;

for(let i = 0; i < groups.length; i++)
{
  groups[i].save((err, result) => {
    done++;
    if(done == groups.length){
      exit();
    }
  });
}

function exit() {
  console.log('groups seeding succeeded');
  db.then(database => database.connection.close());
}