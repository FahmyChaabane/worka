import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    projects(id: String): [Project!]!
  }

  type Project {
    user: User!

    id: ID!
    name: String!
    subheading: String!
    about: String!
    avatar: String!
    createdAt: Date!
    updatedAt: Date!

    comments: [CommentProject!]!
  }
`;
