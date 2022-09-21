import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    followCompanies(id: String): [FollowCompany!]!
  }

  type FollowCompany {
    user: User!
    company: Company!

    id: ID!
    createdAt: Date!
    updatedAt: Date!
  }
`;
