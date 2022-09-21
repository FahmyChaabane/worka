import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    jobOffers(id: String): [JobOffer!]!
  }

  type JobOffer {
    company: Company!

    id: ID!
    title: String!
    isRemote: Boolean!
    contractType: [String!]!
    seniority: [String!]!
    schedule: [String!]!
    salaryRange: [String!]!
    workLocation: [String!]!
    jobDetails: String!
    createdAt: Date!
    updatedAt: Date!

    skills: [OfferSkill!]!
    appliedUsers: [ApplyJobOffer!]!
  }
`;
