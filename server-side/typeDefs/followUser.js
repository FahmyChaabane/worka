import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    followUsers(id: String): [FollowUser!]!
  }

  type FollowUser {
    followed: User!

    id: ID!
    createdAt: Date!
    updatedAt: Date!
  }
`;
