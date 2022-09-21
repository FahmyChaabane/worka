import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const userQuestionnaireSchema = new mongoose.Schema(
  {
    questionnaire: {
      type: ObjectId,
      ref: "TextQuestionnaire",
    },
    email: {
      type: String,
    },
    receiver: {
      type: String,
      enum: ["CANDIDATE", "MANAGER"],
    },
    sender: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const UserQuestionnaire = mongoose.model(
  "UserQuestionnaire",
  userQuestionnaireSchema
);
