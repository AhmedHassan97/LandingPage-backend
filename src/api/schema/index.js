const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type RootMutation {
    createUser(userInput: UserInput): User
  }
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  } 
  type RootQuery {
    login(userName: String!, password: String!): AuthData!
   }
  type User {
    _id: ID!
    userName: String!
    password: String
  }
  input UserInput {
    userName: String!
    password: String!
  }
  schema {
      query:RootQuery
      mutation: RootMutation 
  }
`);
