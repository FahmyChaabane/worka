import { AnswerFaq } from "../models/answerFaq";
import { User } from "../models/user";

export default {
  Query: {
    answerFaqs: async () => await AnswerFaq.find(),
  },
  Mutation: {},
  AnswerFaq: {
    user: async (parent, args, ctx, profile) => {
      const { user: userID } = parent;
      return await User.findOne({ _id: userID });
    },
  },
};
