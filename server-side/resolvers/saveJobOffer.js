import { JobOffer } from "../models/jobOffer";
import { SaveJobOffer } from "../models/saveJobOffer";

export default {
  Query: {
    saveJobOffers: async () => await SaveJobOffer.find(),
  },
  Mutation: {},
  SaveJobOffer: {
    jobOffer: async (parent, args, ctx, profile) => {
      const { jobOffer: jobOfferID } = parent;
      return await JobOffer.findOne({ _id: jobOfferID });
    },
  },
};
