const graphql = require('graphql');
const dummyGroups = require('./dummy-data/groups.json');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} = graphql;

const GroupType = new GraphQLObjectType({
  name: 'Group',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    group: {
      type: GroupType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db/other source
        return dummyGroups.find(group => group.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

// const LedgerType = new GraphQLObjectType({
//   name: 'Ledger',
//   fields: () => ({
//     id: { type: GraphQLString },
//     name: { type: GraphQLString },
//   })
// })