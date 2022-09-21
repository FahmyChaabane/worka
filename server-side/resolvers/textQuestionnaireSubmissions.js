import { UserInputError } from "apollo-server-errors";
import { TextQuestionnaire } from "../models/textQuestionnaire";
import { TextQuestionnaireSubmission } from "../models/textQuestionnaireSubmission";
import { User } from "../models/user";

export default {
  Query: {
    getTextQuestionnaireSubmissionsByID: async (
      parent,
      { questionnaireSubmissionID },
      context,
      info
    ) => {
      return await TextQuestionnaireSubmission.findOne({
        _id: questionnaireSubmissionID,
      });
    },
    textQuestionnaireSubmissionsByQuestionnaireID: async (
      parent,
      { questionnaireID },
      context,
      info
    ) => {
      return await TextQuestionnaireSubmission.find({
        questionnaire: questionnaireID,
      });
    },
    submissionCount: async (parent, { questionnaireID }, context, info) => {
      const submissions = await TextQuestionnaireSubmission.find({
        questionnaire: questionnaireID,
      });
      return submissions.length;
    },
  },
  Mutation: {
    submitTextQuestionnaire: async (_, { data }, { dataSources, userID }) => {
      const { questionnaire, response, userID: id } = data;
      const textQuestionnaire =
        await dataSources.textQuestionnaireModel.findByTextQuestionnaireID(
          questionnaire
        );
      if (!textQuestionnaire) {
        throw new UserInputError("Questionnaire does not exist");
      }

      if (id) {
        if (userID === id)
          throw new UserInputError("Questionnaire cannot be submitted!");

        const user = await dataSources.userModel.findByUserID(id);
        if (!user) throw new UserInputError("User invalid!");
      }

      //check if the user haven't submitted already  (can a user submit more than once?)
      //?? what if he submitted a Q coming from company, and then some other user asked him to submit it for him ?
      const textQuestionnaireSub =
        await dataSources.textQuestionnaireSubmissionModel.findByQuestionnaireUserCandidate(
          questionnaire,
          userID,
          id
        );
      if (textQuestionnaireSub) {
        // even tho he was re-invited to reply on it.
        throw new UserInputError(
          "Questionnaire already submitted by this user"
        );
      }

      const result =
        await dataSources.textQuestionnaireSubmissionModel.addTextQuestSub({
          user: userID,
          questionnaire,
          response,
          ...(!!id && { candidate: id }),
        });

      // delete from userQues the answered questions
      const currentUser = await dataSources.userModel.findByUserID(userID);
      await dataSources.userQuestionnaireModel.deleteAnsweredQuest(
        currentUser.email,
        questionnaire,
        id
      );

      // send notification to company
      await dataSources.companyNotificationModel.add({
        dispatcher: userID,
        message: `You have received a submission for ${textQuestionnaire.title}`,
        link: textQuestionnaire.id,
        company: textQuestionnaire.company,
      });

      console.log("what here", result);
      return result;
    },
  },

  TextQuestionnaireSubmission: {
    user: async (parent, args, ctx, info) => {
      const { user: userID } = parent;
      return await User.findOne({ _id: userID });
    },
    candidate: async (parent, args, ctx, info) => {
      const { candidate: userID } = parent;
      return await User.findOne({ _id: userID });
    },
    questionnaire: async (parent, args, ctx, info) => {
      const { questionnaire: questionnaireID } = parent;
      return await TextQuestionnaire.findOne({ _id: questionnaireID });
    },
  },
};
