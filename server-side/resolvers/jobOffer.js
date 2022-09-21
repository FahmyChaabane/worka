import { ApplyJobOffer } from "../models/applyJobOffer";
import { Company } from "../models/company";
import { JobOffer } from "../models/jobOffer";
import { OfferSkill } from "../models/offerSkill";

export default {
  Query: {
    jobOffers: async () => await JobOffer.find(),
  },
  Mutation: {},
  JobOffer: {
    company: async (parent, args, ctx, profil) => {
      const { company: companyID } = parent;
      return await Company.find({ _id: companyID });
    },
    skills: async (parent, args, ctx, profil) => {
      const { _id: jobOfferID } = parent;
      return await OfferSkill.find({ jobOffer: jobOfferID });
    },
    appliedUsers: async (parent, args, ctx, profil) => {
      const { _id: jobOfferID } = parent;
      return await ApplyJobOffer.find({ jobOffer: jobOfferID });
    },
  },
};
