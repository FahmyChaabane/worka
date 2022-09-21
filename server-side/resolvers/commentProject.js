import { CommentProject } from "../models/commentProject";
import { User } from "../models/user";

export default {
  Query: {
    commentProjects: async () => await CommentProject.find(),
  },
  Mutation: {},
  CommentProject: {
    user: async (parent, args, ctx, profile) => {
      const { user: userID } = parent;
      return await User.findOne({ _id: userID });
    },
  },
};
