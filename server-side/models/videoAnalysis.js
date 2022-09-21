import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;


const videoAnalysisSchema = new mongoose.Schema(
	{
		submission: {
			type: ObjectId,
			ref: "VideoQuestionnaireSubmission",
		},
		analysisData: {
			type: Object
		}
	},
	{ timestamps: true }
);

export const VideoAnalysis = mongoose.model(
	"VideoAnalysis",
	videoAnalysisSchema
);
