import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    filteredSkills(name: String): [Skill!]!
    skill(skillID: ID!): Skill!
    skills(id: String): [Skill!]!
  }

  extend type Mutation {
    addSkillToUser(skillID: ID!): OwnSkill!
    removeSkillFromUser(skillID: ID!): OwnSkill!
    editSkillSeniority(data: editSeniorityContent!): OwnSkill!
  }

  input editSeniorityContent {
    skillID: ID!
    seniority: Int!
  }

  type Skill {
    id: ID!
    name: String!
    avatar: String!

    createdAt: Date!
    updatedAt: Date!
  }
`;
