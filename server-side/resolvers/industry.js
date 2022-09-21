import { Industry } from "../models/industry";

export default {
  Query: {
    industries: async () => await Industry.find(),
  },
  Mutation: {},
  Industry: {},
};
