import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const saveCompanySchema = new mongoose.Schema(
  {
    saver: {
      type: ObjectId,
      ref: "User",
    },
    saved: {
      type: ObjectId,
      ref: "Company",
    },
  },
  { timestamps: true }
);

export const SaveCompany = mongoose.model("SaveCompany", saveCompanySchema);
