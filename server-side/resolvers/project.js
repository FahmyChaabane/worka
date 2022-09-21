import { CommentProject } from "../models/commentProject";
import { Project } from "../models/project";

export default {
  Query: {
    projects: async () => await Project.find(),
  },
  Mutation: {},
  Project: {
    comments: async (parent, args, ctx, profile) => {
      const { _id: projectID } = parent;
      return await CommentProject.find({ project: projectID });
    },
  },
};
