import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const followCompanySchema = new mongoose.Schema(
  {
    follower: {
      type: ObjectId,
      ref: "User",
    },
    followed: {
      type: ObjectId,
      ref: "Company",
    },
  },
  { timestamps: true }
);

export const FollowCompany = mongoose.model(
  "FollowCompany",
  followCompanySchema
);
