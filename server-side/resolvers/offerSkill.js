import { OfferSkill } from "../models/offerSkill";
import { Skill } from "../models/skill";

export default {
  Query: {
    offerSkills: async () => await OfferSkill.find(),
  },
  Mutation: {},
  OfferSkill: {
    skill: async (parent, args, ctx, profil) => {
      const { skill: skillID } = parent;
      return await Skill.findOne({ _id: skillID });
    },
  },
};
