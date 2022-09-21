import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    industries(id: String): [Industry!]!
  }

  type Industry {
    id: ID!
    name: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input IndustrySchema {
    id: ID!
    name: String!
  }
`;
