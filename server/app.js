const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const schema = require('./schema/schema');
const db = require('./db');

const app = express();

app.use(new cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`listening for requests on port ${PORT}`)
});