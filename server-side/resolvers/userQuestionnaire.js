import { UserQuestionnaire } from "../models/userQuestionnaire";
import { TextQuestionnaire } from "../models/textQuestionnaire";
import { User } from "../models/user";

export default {
  Query: {
    userQuestionnaires: async () => await UserQuestionnaire.find(),
  },
  Mutation: {},
  UserQuestionnaire: {
    questionnaire: async (parent, args, ctx, info) => {
      const { questionnaire: questionnaireID } = parent;
      return await TextQuestionnaire.findOne({ _id: questionnaireID });
    },
    sender : async (parent, args, ctx, info) => {
      const { sender: userID } = parent;
      return await User.findOne({ _id: userID });
    },
  },
};
