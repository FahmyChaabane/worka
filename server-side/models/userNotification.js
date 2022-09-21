import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const userNotificationSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    route: {
      type: String,
    },
    user: {
      type: String,
    },
    dispatcher: {
      type: ObjectId,
      ref: "User",
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const UserNotification = mongoose.model(
  "UserNotification",
  userNotificationSchema
);
