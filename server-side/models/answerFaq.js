import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const answerFaqSchema = new mongoose.Schema(
  {
    question: {
      type: ObjectId,
      ref: "QuestionFaq",
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
    answer: {
      type: String,
    },
  },
  { timestamps: true }
);

export const AnswerFaq = mongoose.model("AnswerFaq", answerFaqSchema);
