import { Company } from "../models/company";
import { VideoQuestionnaire } from "../models/videoQuestionnaire";
import { ApolloError, UserInputError } from "apollo-server-errors";
import wrappedSendMail, { mailOptions } from "../config/mailer/config";
import ejs from "ejs";
import path from "path";
import authorize from "../utils/isAuthCompany";

export default {
  Query: {
    videoQuestionnaires: async () => await VideoQuestionnaire.find(),
    myVideoQuestionnaires: async (parent, args, context, info) => {
      const req = authorize(context.req);
      return await VideoQuestionnaire.find({ company: req._id });
    },
    getVideoQuestionnaireByID: async (
      parent,
      { questionnaireID },
      context,
      info
    ) => {
      // const req = authorize(context.req);
      return await VideoQuestionnaire.findOne({ _id: questionnaireID });
    },
    paginatedVideoQuestionnaires: async (
      parent,
      { offset = 0, limit = 3, input },
      context,
      info
    ) => {
      const req = authorize(context.req);

      const query = { company: req._id };

      if (input && input !== "") {
        query["title"] = {
          $regex: input,
          $options: "i",
        };
      }

      const questionnaires = await VideoQuestionnaire.find(query)
        .sort({ _id: -1, createdAt: -1 })
        .skip(offset)
        .limit(limit);

      const count = await VideoQuestionnaire.countDocuments(query);

      return {
        questionnaires,
        count: Math.ceil(count / limit),
      };
    },
  },
  Mutation: {
    createVideoQuestionnaire: async (_, { data }, context) => {
      const req = authorize(context.req);
      const { title, description, questions } = data;

      try {
        const questionnaire = new VideoQuestionnaire({
          title,
          description,
          questions,
          company: req._id,
        });

        const res = await questionnaire.save();
        return res;
      } catch (error) {
        console.log(error);
      }
    },

    sendVideoQuestionnaire: async (
      _,
      { emails, questionnaireID },
      { dataSources, req }
    ) => {
      const auth = authorize(req);

      const questionnaire =
        await dataSources.videoQuestionnaireModel.findByVideoQuestionnaireID(
          questionnaireID
        );
      if (!questionnaire) throw new UserInputError("Invalid questionnaire id!");
      const company = await dataSources.companyModel.findByCompanyID(
        questionnaire.company
      );
      if (!company) throw new UserInputError("Invalid company id!");

      const template = await ejs.renderFile(
        path.join(
          process.env.PWD,
          "/public/templates/questionnaireInvitations.ejs"
        ),
        {
          companyName: company.name,
          questionnaire: questionnaire.title,
          link: `${process.env.USER_FRONT_HOST}/questionnaires/${questionnaire.id}`,
        }
      );

      const options = mailOptions("Questionnaire link", emails, template);
      try {
        const info = await wrappedSendMail(options);
        console.log("Email sent: " + info.response);
      } catch (err) {
        console.log(err);
        throw new ApolloError(
          "Process of sending email has failed",
          "EMAIL_ERROR"
        );
      }

      return "emails sent!";
    },

    editVideoQuestionnaire: async (
      _,
      { questionnaireID, data },
      { req, dataSources }
    ) => {
      const auth = authorize(req);

      const questionnaire =
        await dataSources.videoQuestionnaireModel.editVideoQuestionnaire(
          data,
          questionnaireID
        );

      if (!questionnaire) {
        throw new UserInputError("Questionnaire update failed!");
      }

      return "success";
    },
  },

  VideoQuestionnaire: {
    company: async (parent, args, ctx, info) => {
      const { company: companyID } = parent;
      return await Company.findOne({ _id: companyID });
    },
  },
};
