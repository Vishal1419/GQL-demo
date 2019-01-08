const Nature = require('../models/nature');
const db = require('../db');
const natures = require('../schema/dummy-data/natures.json').map(nature => new Nature({
  ...nature
  _id: ObjectId(nature._id),
}));

let done = 0;

for(let i = 0; i < natures.length; i++)
{
  natures[i].save((err, result) => {
    if (err) { console.log(err); return; }
    done++;
    if(done == natures.length) {
      exit();
    }
  });
}

function exit() {
  console.log('natures seeding succeeded');
  db.then(database => database.connection.close());
}