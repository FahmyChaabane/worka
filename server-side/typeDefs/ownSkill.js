import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    ownSkills(id: String): [OwnSkill!]!
  }

  type OwnSkill {
    user: User!
    skill: Skill!

    id: ID!
    globalRate: [Int!]!
    seniority: Int
    createdAt: Date!
    updatedAt: Date!

    reviews: [Review!]!
  }
`;
