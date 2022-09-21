import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    commentProjects(id: String): [CommentProject!]!
  }

  type CommentProject {
    user: User!
    project: Project!

    id: ID!
    comment: String!
    createdAt: Date!
    updatedAt: Date!
  }
`;
