import { FollowUser } from "../models/followUser";
import { User } from "../models/user";

export default {
  Query: {
    followUsers: async () => await FollowUser.find(),
  },
  Mutation: {},
  FollowUser: {
    followed: async (parent, args, ctx, profile) => {
      const { followed: userID } = parent;
      return await User.findOne({ _id: userID });
    },
  },
};
