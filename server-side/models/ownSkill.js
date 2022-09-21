import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const ownSkillSchema = new mongoose.Schema(
  {
    skill: {
      type: ObjectId,
      ref: "Skill",
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
    globalRate: {
      type: [Number],
      default: [],
    },
    seniority: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const OwnSkill = mongoose.model("OwnSkill", ownSkillSchema);
