import { OwnSkill } from "../models/ownSkill";
import { Review } from "../models/review";
import { Skill } from "../models/skill";
import { User } from "../models/user";

export default {
  Query: {
    ownSkills: async () => await OwnSkill.find(),
  },
  Mutation: {},
  OwnSkill: {
    user: async (parent, args, ctx, profil) => {
      const { user: userID } = parent;
      return await User.findOne({ _id: userID });
    },
    skill: async (parent, args, ctx, profil) => {
      const { skill: skillID } = parent;
      return await Skill.findOne({ _id: skillID });
    },
    reviews: async (parent, args, ctx, profil) => {
      const { _id: ownSkillID } = parent;
      return await Review.find({ ownSkill: ownSkillID });
    },
  },
};
