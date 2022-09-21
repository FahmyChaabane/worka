import { Company } from "../models/company";
import { SaveCompany } from "../models/saveCompany";

export default {
  Query: {
    saveCompanies: async () => await SaveCompany.find(),
  },
  Mutation: {},
  SaveCompany: {
    saved: async (parent, args, ctx, profile) => {
      const { saved: savedID } = parent;
      return await Company.findOne({ _id: savedID });
    },
  },
};
