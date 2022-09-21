import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const questionsSchema = 
  {
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
  },

const questionnaireSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "QuestionFaq",
    },
    company: {
      type: ObjectId,
      ref: "User",
    },
    questions: [questionsSchema],
  },
  { timestamps: true }
);

export const Questionnaire = mongoose.model(
  "Questionnaire",
  questionnaireSchema
);
