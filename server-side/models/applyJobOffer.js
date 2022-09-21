import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const applyJobOfferSchema = new mongoose.Schema(
  {
    jobOffer: {
      type: ObjectId,
      ref: "JobOffer",
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const ApplyJobOffer = mongoose.model(
  "ApplyJobOffer",
  applyJobOfferSchema
);
