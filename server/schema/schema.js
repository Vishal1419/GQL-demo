const graphql = require('graphql');
const dummyGroups = require('./dummy-data/groups.json');
const dummyEffects = require('./dummy-data/effects.json');
const dummyNatures = require('./dummy-data/natures.json');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = graphql;

const GroupType = new GraphQLObjectType({
  name: 'Group',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    alias: { type: GraphQLString },
    parentGroup: {
      type: GroupType,
      resolve(parent, args) {
        return dummyGroups.find(group => group.id === parent.parentId);
      },
    },
    effects: {
      type: new GraphQLList(EffectType),
      resolve(parent, args) {
        return (parent.effectIds && parent.effectIds.map(effectId => dummyEffects.find(effect => effect.id === effectId))) || [];
      },
    },
    nature: {
      type: NatureType,
      resolve(parent, args) {
        return dummyNatures.find(nature => nature.id === parent.natureId);
      },
    },
    isSystemGenerated: { type: GraphQLBoolean },
    mailing: { type: GraphQLBoolean },
    contact: { type: GraphQLBoolean },
    bank: { type: GraphQLBoolean },
    tax: { type: GraphQLBoolean },
  }),
});

const EffectType = new GraphQLObjectType({
  name: 'Effect',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    isSystemGenerated: { type: GraphQLBoolean },
    groups: {
      type: new GraphQLList(GroupType),
      resolve(parent, args) {
        return dummyGroups.filter(group => group.effectId === parent.id);
      },
    },
  }),
});

const NatureType = new GraphQLObjectType({
  name: 'Nature',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    isSystemGenerated: { type: GraphQLBoolean },
    groups: {
      type: new GraphQLList(GroupType),
      resolve(parent, args) {
        return dummyGroups.filter(group => group.natureId === parent.id);
      },
    },
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
    effect: {
      type: EffectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return dummyEffects.find(effect => effect.id === args.id);
      },
    },
    nature: {
      type: NatureType,
      args: { id: { type: GraphQLID} },
      resolve(parent, args) {
        return dummyNatures.find(nature => nature.id === args.id);
      }
    },
    groups: {
      type: new GraphQLList(GroupType),
      resolve(parent, args) {
        return dummyGroups;
      },
    },
    effects: {
      type: new GraphQLList(EffectType),
      resolve(parent, args) {
        return dummyEffects;
      },
    },
    natures: {
      type: new GraphQLList(NatureType),
      resolve(parent, args) {
        return dummyNatures;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
