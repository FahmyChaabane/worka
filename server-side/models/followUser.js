import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const followUserSchema = new mongoose.Schema(
  {
    follower: {
      type: ObjectId,
      ref: "User",
    },
    followed: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const FollowUser = mongoose.model("FollowUser", followUserSchema);
