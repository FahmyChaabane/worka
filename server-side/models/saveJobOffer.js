import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const saveJobOfferSchema = new mongoose.Schema(
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

export const SaveJobOffer = mongoose.model("SaveJobOffer", saveJobOfferSchema);
