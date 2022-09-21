import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const offerSkillSchema = new mongoose.Schema(
  {
    jobOffer: {
      type: ObjectId,
      ref: "JobOffer",
    },
    skill: {
      type: ObjectId,
      ref: "Skill",
    },
  },
  { timestamps: true }
);

export const OfferSkill = mongoose.model("OfferSkill", offerSkillSchema);
