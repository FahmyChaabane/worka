import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const reviewSchema = new mongoose.Schema(
  {
    reviewer: {
      type: ObjectId,
      ref: "User",
    },
    ownSkill: {
      type: ObjectId,
      ref: "OwnSkill",
    },
    relationship: {
      type: String,
    },
    where: {
      type: String,
    },
    description: {
      type: String,
    },
    rate: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
