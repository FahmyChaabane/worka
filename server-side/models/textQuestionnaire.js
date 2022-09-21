import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

import { v4 as uuidv4 } from "uuid";

const choiceSchema = {
  choiceId: {
    type: ObjectId,
  },
  choiceIndex: {
    type: Number,
  },
  choiceQuestion: {
    type: String,
  },
};

const questionsSchema = {
  questionIndex: {
    type: Number,
  },
  type: {
    type: String,
    enum: ["PARAGRAPH", "MULTI", "SINGLE", "SCALE"],
  },
  question: {
    type: String,
  },
  choices: [choiceSchema],
};

const textQuestionnaireSchema = new mongoose.Schema(
  {
    company: {
      type: ObjectId,
      ref: "Company",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    receiver: {
      type: String,
      enum: ["CANDIDATE", "MANAGER"],
    },
    link: {
      type: String,
    },
    questions: [questionsSchema],
  },
  { timestamps: true }
);

textQuestionnaireSchema.pre("save", async function (next) {
  const token = uuidv4();
  this.link = token;
  next();
});

export const TextQuestionnaire = mongoose.model(
  "TextQuestionnaire",
  textQuestionnaireSchema
);
