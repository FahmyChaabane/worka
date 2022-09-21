import { ApplyJobOffer } from "../models/applyJobOffer";
import { JobOffer } from "../models/jobOffer";
import { User } from "../models/user";

export default {
  Query: {
    applyJobOffers: async () => await ApplyJobOffer.find(),
  },
  Mutation: {},
  ApplyJobOffer: {
    // to get user applied on an offer
    user: async (parent, args, ctx, profil) => {
      const { user: userID } = parent;
      return await User.findOne({ _id: userID });
    },
    jobOffer: async (parent, args, ctx, profil) => {
      const { jobOffer: jobOfferID } = parent;
      return await JobOffer.findOne({ _id: jobOfferID });
    },
  },
};
