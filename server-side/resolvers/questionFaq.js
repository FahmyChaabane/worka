import { AnswerFaq } from "../models/answerFaq";
import { QuestionFaq } from "../models/questionFaq";
import { User } from "../models/user";

export default {
  Query: {
    questionFaqs: async () => await QuestionFaq.find(),
  },
  Mutation: {},
  QuestionFaq: {
    user: async (parent, args, ctx, profile) => {
      const { user: userID } = parent;
      return await User.findOne({ _id: userID });
    },
    answers: async (parent, args, ctx, profile) => {
      const { _id: questionFaqID } = parent;
      return await AnswerFaq.find({ question: questionFaqID });
    },
  },
};
