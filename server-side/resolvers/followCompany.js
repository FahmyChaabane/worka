import { Company } from "../models/company";
import { FollowCompany } from "../models/followCompany";
import { User } from "../models/user";

export default {
  Query: {
    followCompanies: async () => await FollowCompany.find(),
  },
  Mutation: {},
  FollowCompany: {
    user: async (parent, args, ctx, profil) => {
      const { follower: followerID } = parent;
      return await User.findOne({ _id: followerID });
    },

    company: async (parent, args, ctx, profil) => {
      const { followed: followedID } = parent;
      return await Company.findOne({ _id: followedID });
    },
  },
};
