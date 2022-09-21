import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const commentProjectSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    project: {
      type: ObjectId,
      ref: "Project",
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

export const CommentProject = mongoose.model(
  "CommentProject",
  commentProjectSchema
);
