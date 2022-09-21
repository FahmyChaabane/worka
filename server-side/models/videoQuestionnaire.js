import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

import { v4 as uuidv4 } from "uuid";

const questionsSchema = {
  index: {
    type: Number,
  },
  question: {
    type: String,
  },
  duration: {
    type: Number, //in millisonds
  },
};

const videoQuestionnaireSchema = new mongoose.Schema(
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
    link: {
      type: String,
    },
    questions: [questionsSchema],
  },
  { timestamps: true }
);

videoQuestionnaireSchema.pre("save", async function (next) {
  const token = uuidv4();
  this.link = token;
  next();
});

export const VideoQuestionnaire = mongoose.model(
  "VideoQuestionnaire",
  videoQuestionnaireSchema
);
