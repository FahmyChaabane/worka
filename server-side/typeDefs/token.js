import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    tokens(id: String): [Token!]!
  }

  extend type Mutation {
    signupPhaseZero(data: tokenContent!): String!
  }

  type Token {
    id: ID!
    token: String!
    name: String!
    surname: String!
    email: String!
    password: String!
  }

  input tokenContent {
    name: String!
    surname: String
    email: String!
    password: String!
  }
`;
