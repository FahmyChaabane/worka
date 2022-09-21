import { UserInputError } from "apollo-server-express";
import { Skill } from "../models/skill";

export default {
  Query: {
    filteredSkills: async (_, { name }, { dataSources }) => {
      return await dataSources.skillModel.findByName(name);
    },
    skill: async (_, { skillID }, { dataSources }) => {
      return await dataSources.skillModel.findBySkillID(skillID);
    },
    skills: async () => await Skill.find(),
  },
  Mutation: {
    addSkillToUser: async (_, { skillID }, { dataSources, userID }) => {
      const skill = await dataSources.skillModel.findBySkillID(skillID);
      if (!skill) throw new UserInputError("skill id is invalid.");
      const coupleSkillUser = await dataSources.ownSkillModel.findCoupleByIDs(
        skillID,
        userID
      );
      if (coupleSkillUser)
        throw new UserInputError(
          "The user has already added this skill to his skills set."
        );
      return await dataSources.ownSkillModel.addSkillUser(skillID, userID);
    },

    removeSkillFromUser: async (_, { skillID }, { dataSources, userID }) => {
      const skill = await dataSources.skillModel.findBySkillID(skillID);
      if (!skill) throw new UserInputError("skill id is invalid.");
      const coupleSkillUser = await dataSources.ownSkillModel.findCoupleByIDs(
        skillID,
        userID
      );
      if (!coupleSkillUser)
        throw new UserInputError(
          "The user does not have this skill in his skills set."
        );
      await dataSources.reviewModel.deleteReviews(coupleSkillUser.id);
      return dataSources.ownSkillModel.deleteSkill(coupleSkillUser.id);
    },

    editSkillSeniority: async (_, { data }, { dataSources, userID }) => {
      const skill = await dataSources.skillModel.findBySkillID(data.skillID);
      if (!skill) throw new UserInputError("skill id is invalid.");
      const coupleSkillUser = await dataSources.ownSkillModel.findCoupleByIDs(
        data.skillID,
        userID
      );
      if (!coupleSkillUser)
        throw new UserInputError(
          "There is no match between the user and the skill."
        );
      return await dataSources.ownSkillModel.editOwnSkillModel(
        { seniority: data.seniority },
        data.skillID,
        userID
      );
    },
  },
  Skill: {},
};
