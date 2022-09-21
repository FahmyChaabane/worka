import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const responseSchema =
{
	questionIndex: {
		type: Number
	},
	response: {
		type: String
	}

},

const videoQuestionnaireSubmission = new mongoose.Schema(
	{
		user: {
			type: ObjectId,
			ref: "User",
		},
		questionnaire: {
			type: ObjectId,
			ref: "VideoQuestionnaire",
		},
		videoPath: {
			type: String
		}
	},
	{ timestamps: true }
);

export const VideoQuestionnaireSubmission = mongoose.model(
	"VideoQuestionnaireSubmission",
	videoQuestionnaireSubmission
);
