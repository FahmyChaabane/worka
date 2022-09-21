import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const jobOfferSchema = new mongoose.Schema(
  {
    company: {
      type: ObjectId,
      ref: "Company",
    },
    title: {
      type: String,
    },
    isRemote: {
      type: Boolean,
    },
    contractType: {
      type: [String],
      enum: ["Full Time Job", "Part Time Job"],
    },
    seniority: {
      type: [String],
      enum: ["Junior", "Senior", "PhD", "Expert"],
    },
    schedule: {
      type: [String],
    },
    salaryRange: {
      type: [String],
    },
    workLocation: {
      type: [String],
    },
    jobDetails: {
      type: String,
    },
    // futureTasks: {
    //   type: [String],
    // },
    // expectedProfile: {
    //   type: [String],
    // },
    // postingStatement: {
    //   type: [String],
    // },
  },
  { timestamps: true }
);

export const JobOffer = mongoose.model("JobOffer", jobOfferSchema);
