const graphql = require('graphql');

const Effect = require('../models/effect');
const Nature = require('../models/nature');
const Group = require('../models/group');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
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
        return Group.findById(parent.parentId);
      },
    },
    effects: {
      type: new GraphQLList(EffectType),
      resolve(parent, args) {
        return (parent.effectIds && parent.effectIds.map(effectId => Effect.findById(effectId))) || [];
      },
    },
    nature: {
      type: NatureType,
      resolve(parent, args) {
        return Nature.findById(parent.natureId);
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
        return Group.find({ effectId: parent._id });
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
        return Group.find({ natureId: parent._id });
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
        return Group.findById(args.id);
      },
    },
    effect: {
      type: EffectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Effect.findById(args.id);
      },
    },
    nature: {
      type: NatureType,
      args: { id: { type: GraphQLID} },
      resolve(parent, args) {
        return Nature.findById(args.id);
      }
    },
    groups: {
      type: new GraphQLList(GroupType),
      resolve(parent, args) {
        return Group.find({});
      },
    },
    effects: {
      type: new GraphQLList(EffectType),
      resolve(parent, args) {
        return Effect.find({});
      },
    },
    natures: {
      type: new GraphQLList(NatureType),
      resolve(parent, args) {
        return Nature.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addEffect: {
      type: EffectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let effect = new Effect({
          name: args.name,
          isSystemGenerated: false,
        });
        return effect.save();
      },
    },
    addNature: {
      type: NatureType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const nature = new Nature({
          name: args.name,
          isSystemGenerated: false,
        });
        return nature.save();
      },
    },
    addGroup: {
      type: GroupType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        alias: { type: GraphQLString },
        parentId: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const parentGroup = await Group.findById(args.parentId);
        console.log(parentGroup);
        const group = new Group({
          name: args.name,
          alias: args.alias,
          parentId: args.parentId,
          effectIds: parentGroup.effectIds,
          natureId: parentGroup.natureId,
          isSystemGenerated: false,
          mailing: parentGroup.mailing,
          contact: parentGroup.contact,
          bank: parentGroup.bank,
          tax: parentGroup.tax,
        });
        return group.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
