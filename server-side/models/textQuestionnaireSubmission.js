import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const choiceSchema = {
  choiceQuestion: {
    type: String,
  },
};

const responseSchema = {
  type: {
    type: String,
    enum: ["PARAGRAPH", "MULTI", "SINGLE", "SCALE"],
  },
  question: {
    type: String,
  },
  response: {
    type: String,
  },
  choices: [choiceSchema],
};

const textQuestionnaireSubmission = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    candidate: {
      type: ObjectId,
      ref: "User",
    },
    questionnaire: {
      type: ObjectId,
      ref: "TextQuestionnaire",
    },
    response: [responseSchema],
  },
  { timestamps: true }
);

/* const responseSchema =
{
	questionId: {
		type: ObjectId
	},
	questionIndex: {
		type: Number
	},
	response: {
		type: String
	}

},

const textQuestionnaireSubmission = new mongoose.Schema(
	{
		user: {
			type: ObjectId,
			ref: "User",
		},
		questionnaire: {
			type: ObjectId,
			ref: "TextQuestionnaire",
		},
		response: [responseSchema],
	},
	{ timestamps: true }
); */

export const TextQuestionnaireSubmission = mongoose.model(
  "TextQuestionnaireSubmission",
  textQuestionnaireSubmission
);
