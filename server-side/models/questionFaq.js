import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const questionFaqSchema = new mongoose.Schema(
  {
    company: {
      type: ObjectId,
      ref: "Company",
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
    question: {
      type: String,
    },
  },
  { timestamps: true }
);

export const QuestionFaq = mongoose.model("QuestionFaq", questionFaqSchema);
