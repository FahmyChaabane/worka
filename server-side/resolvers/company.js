import { Company } from "../models/company";
import { FollowCompany } from "../models/followCompany";
import { Industry } from "../models/industry";
import { JobOffer } from "../models/jobOffer";
import { QuestionFaq } from "../models/questionFaq";
import { Token } from "../models/token";

import authorize from "../utils/isAuthCompany";
import isOwner from "../utils/isOwnerCompany";

import sendResponseCookie from "../utils/sendResponseCookie";

import wrappedSendMail, { mailOptions } from "../config/mailer/config";
import ejs from "ejs";
import path from "path";
import { TextQuestionnaire } from "../models/textQuestionnaire";

export default {
  Query: {
    companies: async () => await Company.find(),
    loggedInCompany: async (parent, args, context, info) => {
      const req = authorize(context.req);
      return await Company.findOne({ _id: req._id });
    },
  },
  Mutation: {
    companyLogin: async (_, { data }, context, info) => {
      const company = await context.dataSources.companyModel.findByEmail(
        data.email
      );
      if (!company) throw "email or password are invalid.";
      const validPwd = await context.dataSources.companyModel.validatePwd(
        data.password,
        company.password
      );
      if (!validPwd) throw "email or password are invalid.";
      const token = await context.dataSources.companyModel.generateJWT(
        company.id
      );
      await sendResponseCookie(context.res, token);

      return await token;
    },
    companyLogout: async (_, { data }, { res }, info) => {
      res.cookie("token", "none", {
        expires: new Date(Date.now() - 100 * 1000),
        httpOnly: true,
        domain: process.env.DOMAIN,
      });
      return await "ok";
    },

    companySignup: async (_, { tokenID }, { dataSources }) => {
      try {
        const token = await Token.findOne({ token: tokenID });

        if (!token) throw "verification delay has been expired!";
        const company = await dataSources.companyModel.findByEmail(token.email);
        if (company) throw "account already exist!";

        return await dataSources.companyModel.addCompany({
          name: token.name,
          email: token.email,
          password: token.password,
        });
      } catch (error) {
        console.log(error);
        return "error";
      }
    },

    completeCompanyProfile: async (_, { data }, context) => {
      const req = authorize(context.req);

      return await context.dataSources.companyModel.fillCompanyModel(
        data,
        req._id
      );
    },

    companyForgotPassword: async (_, { email }, { dataSources }) => {
      const company = await dataSources.companyModel.findByEmail(email);

      if (!company) {
        throw "Email not associated to any accounts";
      }

      const resetToken = company.generateResetPasswordToken();
      await company.save({ validateBeforeSave: false });
      const resetURI = `http://${process.env.COMPANY_FRONT_HOST}/reset-password?verification=${resetToken}`;

      const template = await ejs.renderFile(
        path.join(
          process.env.PWD,
          "/public/templates/companyResetPassword.ejs"
        ),
        {
          name: company.name,
          link: resetURI,
        }
      );

      const options = mailOptions("Reset Password", email, template);
      console.log("options", options);

      try {
        const info = await wrappedSendMail(options);
        console.log("Email sent: " + info.response);
      } catch (err) {
        throw new Error("Process of sending email has failed.");
      }

      return "Reset password email sent";
    },

    companyResetPassword: async (
      _,
      { resetPwToken, newPw },
      { dataSources }
    ) => {
      const company = await Company.findOne({
        resetPasswordToken: resetPwToken,
        resetPasswordExpire: {
          $gt: Date.now(),
        },
      });

      if (!company) {
        throw "Reset link not valid";
      }

      company.password = newPw;
      company.resetPasswordToken = undefined;
      company.resetPasswordExpire = undefined;
      await company.save();
    },
  },
  Company: {
    industry: async (parent, args, ctx, profil) => {
      const { industry: industryID } = parent;
      return await Industry.findOne({ _id: industryID });
    },
    employees: async (parent, args, ctx, profil) => {
      const { _id: companyID } = parent;
      return await FollowCompany.find({ followed: companyID });
    },
    jobOffers: async (parent, args, ctx, profil) => {
      const { _id: companyID } = parent;
      return await JobOffer.find({ company: companyID });
    },
    questions: async (parent, args, ctx, profil) => {
      const { _id: companyID } = parent;
      return await TextQuestionnaire.find({ company: companyID });
    },
  },
};
