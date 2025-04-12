const graphQL = require("graphql");
const axios = require("axios");

const { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString } = graphQL;

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  },
});

const UserType = new GraphQLObjectType({
  name: "Users",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    company: {  
      type: new graphQL.GraphQLList(CompanyType),
      args: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
      },
      async resolve(parentValue, args) {
        const url = `http://localhost:3000/company?id=${parentValue?.companyId}`
        return axios.get(url).then((res) => res.data);
      },
    },
  },
});

const rootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: {
    users: {
      type: new graphQL.GraphQLList(UserType),
      args: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
      },
      async resolve(parentValue, args) {
        const queryParams = new URLSearchParams(args).toString();
        const url = queryParams
          ? `http://localhost:3000/users?${queryParams}`
          : `http://localhost:3000/users`;

        return axios.get(url).then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
});
