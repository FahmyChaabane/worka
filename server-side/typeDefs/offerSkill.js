import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    offerSkills(id: String): [OfferSkill!]!
  }

  type OfferSkill {
    jobOffer: JobOffer!
    skill: Skill!

    id: ID!
    createdAt: Date!
    updatedAt: Date!
  }
`;
