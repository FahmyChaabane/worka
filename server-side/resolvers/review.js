import wrappedSendMail, { mailOptions } from "../config/mailer/config";
import { Review } from "../models/review";
import { User } from "../models/user";
import { ApolloError, UserInputError } from "apollo-server-express";
import ejs from "ejs";
import path from "path";

export default {
  Query: {
    reviews: async () => await Review.find(),
  },
  Mutation: {
    sendReviewInvitationsEmails: async (
      _,
      { data },
      { dataSources, userID }
    ) => {
      const skill = await dataSources.skillModel.findBySkillID(data.skillID);
      if (!skill) throw new UserInputError("Invalid skill!");
      const requester = await dataSources.userModel.findByUserID(userID);

      const template = await ejs.renderFile(
        path.join(process.env.PWD, "/public/templates/reviewInvitation.ejs"),
        {
          requester: `${requester.name} ${requester.surname}`,
          skill: skill.name,
          link: `${process.env.USER_FRONT_HOST}/review?skillID=${data.skillID}&userID=${userID}`,
        }
      );

      const options = mailOptions("Review Invitation", data.emails, template);
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

      data.emails.map(async (email) => {
        // if not same account
        if (email !== requester.email) {
          // create notification
          const user = await dataSources.userModel.findByEmail(email);
          // not to create a notification an unsubscribed user
          if (user) {
            await dataSources.userNotificationModel.addNotification({
              text: `${requester.name} ${requester.surname} asked you to review his skill`,
              route: `/review?skillID=${data.skillID}&userID=${userID}`,
              user: user.email,
              dispatcher: userID,
            });
          }
        }
      });

      return "emails sent!";
    },
    addReview: async (_, { data }, { dataSources, userID }) => {
      const skill = await dataSources.skillModel.findBySkillID(data.skillID);
      if (!skill) throw new UserInputError("skill id is invalid.");
      if (data.userID === userID)
        throw new UserInputError("can not review your own skill.");
      const user = await dataSources.userModel.findByUserID(data.userID);
      if (!user) throw new UserInputError("user id is invalid.");
      const coupleSkillUser = await dataSources.ownSkillModel.findCoupleByIDs(
        data.skillID,
        data.userID
      );
      if (!coupleSkillUser)
        throw new UserInputError(
          "There is no match between the user and the skill."
        );
      await dataSources.reviewModel.addReview({
        reviewer: userID,
        ownSkill: coupleSkillUser,
        where: data.where,
        relationship: data.relationship,
        description: data.description,
        rate: data.rate,
      });
      coupleSkillUser.globalRate.push(data.rate);
      return await coupleSkillUser.save();
    },
  },
  Review: {
    reviewer: async (parent, args, ctx, profil) => {
      const { reviewer: reviewerID } = parent;
      return await User.findOne({ _id: reviewerID });
    },
  },
};
