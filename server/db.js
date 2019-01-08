const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://Vishal1419:1419251v@ds161620.mlab.com:61620/gql-demo', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('connected to the database');
});

module.exports = db;