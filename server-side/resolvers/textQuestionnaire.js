import { Company } from "../models/company";
import { TextQuestionnaire } from "../models/textQuestionnaire";
import { UserQuestionnaire } from "../models/userQuestionnaire";
import { ApolloError, UserInputError } from "apollo-server-errors";
import wrappedSendMail, { mailOptions } from "../config/mailer/config";
import ejs from "ejs";
import path from "path";
import authorize from "../utils/isAuthCompany";

export default {
  Query: {
    textQuestionnaires: async () => await TextQuestionnaire.find(),
    myTextQuestionnaires: async (parent, args, context, info) => {
      const req = authorize(context.req);
      return await TextQuestionnaire.find({ company: req._id }).sort({
        createdAt: -1,
      });
    },
    /* paginatedTextQuestionnaires: async (
      parent,
      { cursor, limit = 4 },
      context,
      info
    ) => {
      const req = authorize(context.req);

      const query = { company: req._id };

      if (cursor) {
        query["_id"] = {
          $lt: cursor,
        };
      }

      let questionnaires = await TextQuestionnaire.find(query)
        .sort({ _id: -1, createdAt: -1 })
        .limit(limit);

      const hasNextPage = questionnaires.length > limit;
      questionnaires = hasNextPage
        ? questionnaires.slice(0, -1)
        : questionnaires;

      return {
        questionnaires,

        pageInfo: {
          nextPageCursor: hasNextPage
            ? questionnaires[questionnaires.length - 1].id
            : null,
          hasNextPage,
        },
      };
    }, */

    paginatedTextQuestionnaires: async (
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

      const questionnaires = await TextQuestionnaire.find(query)
        .sort({ _id: -1, createdAt: -1 })
        .skip(offset)
        .limit(limit);

      const count = await TextQuestionnaire.countDocuments(query);

      return {
        questionnaires,
        count: Math.ceil(count / limit),
      };
    },

    getQuestionnaireByID: async (
      parent,
      { questionnaireID },
      context,
      info
    ) => {
      // const req = authorize(context.req);
      return await TextQuestionnaire.findOne({ _id: questionnaireID });
    },
  },
  Mutation: {
    createTextQuestionnaire: async (_, { data }, context) => {
      const req = authorize(context.req);
      const { title, receiver, description, questions } = data;
      try {
        const questionnaire = new TextQuestionnaire({
          title,
          description,
          receiver,
          questions,
          company: req._id,
        });

        const res = await questionnaire.save();
        return res;
      } catch (error) {
        console.log(error);
      }
    },

    sendTextQuestionnaireToUser: async (
      _,
      { emails, questionnaireID },
      { dataSources, req }
    ) => {
      console.log(emails);
      console.log(questionnaireID);

      const auth = authorize(req);

      const questionnaire =
        await dataSources.textQuestionnaireModel.findByTextQuestionnaireID(
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
        for (let i = 0; i < emails.length; i++) {
          const userQuest =
            await dataSources.userQuestionnaireModel.findByEmail_Questionnaire_Sender(
              emails[i],
              questionnaireID,
              null // null?
            );
          console.log(emails[i]);
          if (!userQuest) {
            console.log("user quest not found so gonna add");
            const userQuestionnaire =
              await dataSources.userQuestionnaireModel.add(
                emails[i],
                questionnaireID,
                questionnaire.receiver
              );
            if (!userQuestionnaire) {
              console.log("user quest add did not succeed");
            }
          }
        }
      } catch (err) {
        console.log(err);
        throw new ApolloError(
          "Process of sending email has failed",
          "EMAIL_ERROR"
        );
      }

      return "emails sent!";
    },

    sendTextQuestionnaireToManager: async (
      _,
      { emails, questionnaireID },
      { dataSources, userID }
    ) => {
      //check quest exist
      const questionnaire =
        await dataSources.textQuestionnaireModel.findByTextQuestionnaireID(
          questionnaireID
        );
      if (!questionnaire) throw new UserInputError("Invalid questionnaire id!");

      // check company exist
      const company = await dataSources.companyModel.findByCompanyID(
        questionnaire.company
      );
      if (!company) throw new UserInputError("Invalid company id!");

      const requester = await dataSources.userModel.findByUserID(userID);

      // prepare template
      const template = await ejs.renderFile(
        path.join(
          process.env.PWD,
          "/public/templates/questionnaireSendToManager.ejs"
        ),
        {
          companyName: company.name,
          questionnaire: questionnaire.title,
          link: `${process.env.USER_FRONT_HOST}/questionnaires/${questionnaire.id}?userID=${userID}`,
          dispatcher: `${requester.name} ${requester.surname}`,
        }
      );

      // edit manager to candidate (throu adding new doc) and assign sender (original candidate) id
      // check combination qustion - user exist
      // ((((this check is made for manager who received same ques as candidate and manager (from others) )))
      // this check is specifically made to get out the userQues that i sent by a company (bcuz 3rd arg is meant to be only filled when the Ques is sent by an other employee eg. not company)
      const userQuest =
        await dataSources.userQuestionnaireModel.findByEmail_Questionnaire_Sender(
          requester.email,
          questionnaireID,
          null
        );
      if (!userQuest)
        throw new ApolloError(
          "Process has failed, Questionnaire User combination was not found"
        );

      // check weither quest was already sent or not (if [email] got one el, and quest is sent, then throw msg err in front)
      // if not same account
      if (emails.includes(requester.email))
        // CKE99
        throw new ApolloError(
          "Process has failed, you cannot include your own email"
        );
      for (const email of emails) {
        const tupleDoc =
          await dataSources.userQuestionnaireModel.findByEmail_Questionnaire_Sender(
            email,
            questionnaireID,
            userID
          );
        // in case same ques was already submitted (means deleted from userQues), do i have to add an other check to see whether if it was sumitted before or not ?
        if (!tupleDoc) {
          // if userQues not found for that user, then do the work (if found, means already been sent)
          await dataSources.userQuestionnaireModel.add(
            email,
            questionnaireID,
            "CANDIDATE",
            userID
          );
          // email configs
          const options = mailOptions(
            "Questionnaire link",
            email,
            template,
            requester.email
          );

          // email sending
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
        } else if (emails.length == 1)
          throw new ApolloError("Questionnaire has already been sent");
      }

      // create notif
      emails.forEach(async (email) => {
        // if not same account
        // if (email !== requester.email) { // no need since // CKE99
        const user = await dataSources.userModel.findByEmail(email);
        // not to create a notification for an unsubscribed user
        if (user)
          await dataSources.userNotificationModel.addNotification({
            text: `${requester.name} ${requester.surname} asked you to answer a questionnaire`,
            route: `/questionnaires/${questionnaire.id}?userID=${userID}`,
            user: email,
            dispatcher: userID,
          });
        // }
      });

      return "emails sent!";
    },

    editTextQuestionnaire: async (
      _,
      { questionnaireID, data },
      { req, dataSources }
    ) => {
      const auth = authorize(req);

      const questionnaire =
        await dataSources.textQuestionnaireModel.editTextQuestionnaire(
          data,
          questionnaireID
        );

      if (!questionnaire) {
        throw new UserInputError("Questionnaire update failed!");
      }

      return "success";
    },
  },

  TextQuestionnaire: {
    company: async (parent, args, ctx, info) => {
      const { company: companyID } = parent;
      return await Company.findOne({ _id: companyID });
    },
  },
};
