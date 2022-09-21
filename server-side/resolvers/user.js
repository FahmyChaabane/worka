import transporter, { mailOptions } from "../config/mailer/config";
import { randomBytes } from "crypto";
import { ApolloError, UserInputError } from "apollo-server-express";
import { ApplyJobOffer } from "../models/applyJobOffer";
import { FollowCompany } from "../models/followCompany";
import { FollowUser } from "../models/followUser";
import { OwnSkill } from "../models/ownSkill";
import { Project } from "../models/project";
import { SaveCompany } from "../models/saveCompany";
import { SaveJobOffer } from "../models/saveJobOffer";
import { User } from "../models/user";
import { UserNotification } from "../models/userNotification";
import fs from "fs";
import ejs from "ejs";
import path from "path";
import _ from "lodash";
import authorize from "../utils/isAuthCompany";
import { UserQuestionnaire } from "../models/userQuestionnaire";
import { TextQuestionnaireSubmission } from "../models/textQuestionnaireSubmission";

export default {
  Query: {
    currentUser: async (root, args, { dataSources, userID }) => {
      return await dataSources.userModel.findByUserID(userID);
    },
    getUserProfile: async (root, { userID }, { dataSources }) => {
      return await dataSources.userModel.findByUserID(userID);
    },
    filterUsers: async (_, { filter }, { dataSources }) => {
      return await dataSources.userModel.filterUsers(filter);
    },
    users: async () => await User.find(),

    userQuestioned: async (r, params, { dataSources }) => {
      console.log("params", params);
      let users = [];
      const userQuestionsTable = await Promise.all(
        params.qIds.map(async (el) => {
          const uqs = await dataSources.userQuestionnaireModel.findByQuestionId(
            el
          );
          return uqs;
        })
      );
      const questionnaireSubmissionTable = await Promise.all(
        params.qIds.map(async (el) => {
          const uqs =
            await dataSources.textQuestionnaireSubmissionModel.findByQuestionId(
              el
            );
          return uqs;
        })
      );

      // const mergedTables = [
      //   ...userQuestionsTable,
      //   ...questionnaireSubmissionTable,
      // ];
      // console.log("uqs", questionnaireSubmissionTable);
      for (let i = 0; i < userQuestionsTable.length; i++) {
        for (let j = 0; j < userQuestionsTable[i].length; j++) {
          const user = await dataSources.userModel.findByEmail(
            userQuestionsTable[i][j].email
          );
          if (user) users.push(user);
        }
      }

      for (let i = 0; i < questionnaireSubmissionTable.length; i++) {
        for (let j = 0; j < questionnaireSubmissionTable[i].length; j++) {
          const user = await dataSources.userModel.findByUserID(
            questionnaireSubmissionTable[i][j].user
          );
          if (user) users.push(user);
        }
      }

      return _.uniqBy(users, "id");
    },

    getUserByID: async (_, { userID }, { dataSources, req }) => {
      // const auth = authorize(req);
      return await dataSources.userModel.findByUserID(userID);
    },
  },

  Mutation: {
    createUserAccount: async (_, { tokenID }, { dataSources }) => {
      // verifiy token
      const token = await dataSources.tokenModel.getToken(tokenID);
      if (!token)
        throw new UserInputError(
          "Error when fetching the user, either the verification delay has expired or you have not clicked the most recent verification link!"
        );

      // user
      const user = await dataSources.userModel.findByEmail(token.email);
      if (user)
        throw new UserInputError(
          "An account with the specified email already exist!"
        );
      // company
      const company = await dataSources.companyModel.findByEmail(token.email);
      if (company)
        throw new UserInputError(
          "An account with the specified email already exist!"
        );
      return await dataSources.userModel.addUser({
        name: token.name,
        surname: token.surname,
        email: token.email,
        password: token.password,
      });
    },

    login: async (_, { data }, { dataSources }) => {
      const user = await dataSources.userModel.findByEmail(data.email);
      if (!user)
        throw new UserInputError("Either email or password are invalid!");
      const validPwd = await dataSources.userModel.validatePwd(
        data.password,
        user.password
      );
      if (!validPwd)
        throw new UserInputError("Either email or password are invalid!");
      return await dataSources.userModel.generateJWT(user.id);
    },

    completeUserAccount: async (_, { data }, { dataSources, userID }) => {
      if (data.avatar) {
        const { avatar } = data;
        const { createReadStream, filename, mimetype, encoding } = await avatar;
        const stream = createReadStream();
        const imgPath = "/images/" + `${Date.now()}-${filename}`;
        const out = fs.createWriteStream(
          path.join(process.env.PWD, "/public" + imgPath)
        );
        stream.pipe(out);
        data.avatar = imgPath;
      }
      return await dataSources.userModel.fillUserModel(data, userID);
    },

    editUserAccountData: async (root, { data }, { dataSources, userID }) => {
      const user = await dataSources.userModel.findByUserID(userID);
      if (data.avatar) {
        const { createReadStream, filename, mimetype, encoding } =
          await data.avatar;
        // console.log("filename", filename);
        // console.log("mimetype", mimetype);
        // console.log("encoding", encoding);
        if (filename === "fake") {
          data = _.pick(
            data,
            _.remove(Object.keys(data), (item) => item !== "avatar")
          );
        } else {
          const stream = createReadStream();
          const imgPath = "/images/" + `${Date.now()}-${filename}`;
          const out = fs.createWriteStream(
            path.join(process.env.PWD, "/public" + imgPath)
          );
          stream.pipe(out);
          if (user.avatar) {
            await fs.promises.unlink(
              path.join(process.env.PWD, "/public" + user.avatar)
            );
          }
          data.avatar = imgPath;
        }
      } else if (data.avatar === null) {
        await fs.promises.unlink(
          path.join(process.env.PWD, "/public" + user.avatar)
        );
        data.avatar = null;
      } else {
        throw new UserInputError("unexpected behaviour!");
      }
      return await dataSources.userModel.editUserModel(data, userID);
    },

    setResetPasswordToken: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userModel.findByEmail(email);
      if (!user)
        throw new UserInputError(
          "No user account with such email address exists!"
        );
      const token = randomBytes(20).toString("hex");
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 1000 * 60 * 15; // 15min

      await user.save();

      const template = await ejs.renderFile(
        path.join(
          process.env.PWD,
          "/public/templates/userResetPasswordTemplate.ejs"
        ),
        {
          name: user.name,
          surname: user.surname,
          link: `${process.env.USER_FRONT_HOST}/login/reset_password?verification=${token}&name=${user.name}&surname=${user.surname}`,
        }
      );

      const options = mailOptions("Reset Password", email, template);
      transporter.sendMail(options, (err, info) => {
        if (err) {
          console.log(err);
          throw new ApolloError(
            "Process of sending email has failed",
            "EMAIL_ERROR"
          );
        } else {
          console.log("Message sent: " + info.response);
        }
      });

      return token;
    },

    resetPassword: async (_, { data }, { dataSources }) => {
      const user = await dataSources.userModel.findByResetToken(data.token);
      if (!user)
        throw new UserInputError(
          "Password reset token is invalid or has expired."
        );

      user.password = data.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();
      return "ok";
    },

    followUser: async (_, { profileID }, { dataSources, userID }) => {
      const userProfile = await dataSources.userModel.findByUserID(profileID);
      if (!userProfile) throw new UserInputError("profile id is invalid.");
      const coupleFlwrFlwd = await dataSources.followUserModel.findCoupleByIDs(
        userID,
        profileID
      );
      if (coupleFlwrFlwd)
        throw new UserInputError(
          "The user is already followed by the current user"
        );
      return await dataSources.followUserModel.applyFollowing(
        userID,
        profileID
      );
    },

    unfollowUser: async (_, { profileID }, { dataSources, userID }) => {
      const userProfile = await dataSources.userModel.findByUserID(profileID);
      if (!userProfile) throw new UserInputError("profile id is invalid.");
      const coupleFlwrFlwd = await dataSources.followUserModel.findCoupleByIDs(
        userID,
        profileID
      );
      if (!coupleFlwrFlwd)
        throw new UserInputError(
          "The user is not followed by the current user"
        );
      return await dataSources.followUserModel.applyUnFollowing(
        userID,
        profileID
      );
    },
  },

  User: {
    skills: async (parent, args, ctx, profil) => {
      const { _id: userID } = parent;
      return OwnSkill.find({ user: userID });
    },
    followedcompanies: async (parent, args, ctx, profil) => {
      const { _id: userID } = parent;
      return await FollowCompany.find({ follower: userID });
    },
    followedUsers: async (parent, args, ctx, profil) => {
      const { _id: userID } = parent;
      return await FollowUser.find({ follower: userID });
    },
    savedcompanies: async (parent, args, ctx, profil) => {
      const { _id: userID } = parent;
      return await SaveCompany.find({ saver: userID });
    },
    appliedJobOffers: async (parent, args, ctx, profil) => {
      const { _id: userID } = parent;
      return await ApplyJobOffer.find({ user: userID });
    },
    savedJobOffers: async (parent, args, ctx, profil) => {
      const { _id: userID } = parent;
      return await SaveJobOffer.find({ user: userID });
    },
    projects: async (parent, args, ctx, profil) => {
      const { _id: userID } = parent;
      return await Project.find({ user: userID });
    },
    notifications: async (parent, { offset = 0, limit = 5 }, ctx, profil) => {
      // console.log("limit :: ", offset, limit);
      const { email } = parent;
      const result = await UserNotification.find({ user: email })
        .skip(offset)
        .limit(limit)
        .sort("-createdAt");
      console.log(result.map((el) => el._id));
      return result;
    },
    answeredQuestions: async (parent, args, ctx, profil) => {
      const { _id: userID } = parent;
      return await TextQuestionnaireSubmission.find({ user: userID }).sort(
        "-createdAt"
      );
    },
    toBeSentQuestions: async (parent, args, ctx, profil) => {
      const { email } = parent;
      return await UserQuestionnaire.find({ email, receiver: "MANAGER" }).sort(
        "-createdAt"
      );
    },
    toBeAnsweredQuestions: async (parent, args, ctx, profil) => {
      const { email } = parent;
      return await UserQuestionnaire.find({
        email,
        receiver: "CANDIDATE",
      }).sort("-createdAt");
    },
  },
};
