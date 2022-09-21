import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    applyJobOffers(id: String): [ApplyJobOffer!]!
  }

  type ApplyJobOffer {
    jobOffer: JobOffer!
    user: User!

    id: ID!
    createdAt: Date!
    updatedAt: Date!
  }
`;
