import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    reviews(id: String): [Review!]!
  }

  extend type Mutation {
    sendReviewInvitationsEmails(data: EmailsContent!): String!
    addReview(data: ReviewContent!): OwnSkill!
  }

  input EmailsContent {
    skillID: ID!
    emails: [String!]!
  }

  input ReviewContent {
    skillID: ID!
    userID: ID!
    where: String!
    relationship: String!
    description: String
    rate: Int!
  }

  type Review {
    reviewer: User!
    ownSkill: OwnSkill!

    id: ID!
    relationship: String!
    where: String!
    description: String!
    rate: Int!
    createdAt: Date!
    updatedAt: Date!
  }
`;
