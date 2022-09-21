import { gql } from "@apollo/client";

export const GET_SKILL = gql`
  query ($skillSkillId: ID!) {
    skill(skillID: $skillSkillId) {
      id
      name
    }
  }
`;

export const GET_SKILLS_LIST = gql`
  query FILTERED_SKILLS($filteredSkillsName: String!) {
    filteredSkills(name: $filteredSkillsName) {
      id
      name
    }
  }
`;

export const ADD_SKILL_TO_USER = gql`
  mutation ($addSkillToUserSkillId: ID!) {
    addSkillToUser(skillID: $addSkillToUserSkillId) {
      id
      globalRate
      seniority
      skill {
        id
        name
      }
      reviews {
        id
        relationship
        description
        rate
        createdAt
        reviewer {
          id
          name
          surname
          avatar
          domain {
            name
            jobTitle
          }
        }
      }
    }
  }
`;

export const EDIT_SKILL_SENIORITY = gql`
  mutation ($editSkillSeniorityData: editSeniorityContent!) {
    editSkillSeniority(data: $editSkillSeniorityData) {
      id
      seniority
      # globalRate // fragments maybe ?
      # reviews {
      #   id
      #   relationship
      #   description
      #   rate
      #   createdAt
      #   reviewer {
      #     id
      #     name
      #     surname
      #     avatar
      #     domain {
      #       name
      #       jobTitle
      #     }
      #   }
      # }
    }
  }
`;

export const REMOVE_SKILL_FROM_USER = gql`
  mutation ($skillId: ID!) {
    removeSkillFromUser(skillID: $skillId) {
      id
    }
  }
`;
