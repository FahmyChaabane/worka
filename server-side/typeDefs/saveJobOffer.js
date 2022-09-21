import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    saveJobOffers(id: String): [SaveJobOffer!]!
  }

  type SaveJobOffer {
    jobOffer: JobOffer!
    user: User!

    id: ID!
    createdAt: Date!
    updatedAt: Date!
  }
`;
