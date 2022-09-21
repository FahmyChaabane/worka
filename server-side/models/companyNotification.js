import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const companyNotificationSchema = new mongoose.Schema(
  {
    company: {
      type: ObjectId,
      ref: "Company",
    },
    message: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
    dispatcher: {
      type: ObjectId,
      ref: "User",
    },
    link: {
      type: String,
    },
  },

  { timestamps: true }
);

export const CompanyNotification = mongoose.model(
  "CompanyNotification",
  companyNotificationSchema
);
