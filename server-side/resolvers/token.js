import { Token } from "../models/token";
import { ApolloError, UserInputError } from "apollo-server-express";
import wrappedSendMail, { mailOptions } from "../config/mailer/config";
import ejs from "ejs";
import path from "path";

export default {
  Query: {
    tokens: async () => await Token.find(),
  },
  Mutation: {
    signupPhaseZero: async (_, { data }, { dataSources }) => {
      // user
      const user = await dataSources.userModel.findByEmail(data.email);
      if (user)
        throw new UserInputError(
          "An account with the specified email already exist!"
        );
      // company
      const company = await dataSources.companyModel.findByEmail(data.email);
      if (company)
        throw new UserInputError(
          "An account with the specified email already exist!"
        );
      const tokenExist = await dataSources.tokenModel.findByEmail(data.email);
      if (tokenExist) await dataSources.tokenModel.deleteToken(data.email);
      const token = await dataSources.tokenModel.addToken(data);

      const template = await ejs.renderFile(
        path.join(
          process.env.PWD,
          "/public/templates/userActivateAccountTemplate.ejs"
        ),
        {
          name: token.name,
          surname: token.surname,
          link: `${token.surname ? process.env.USER_FRONT_HOST : process.env.COMPANY_FRONT_HOST}/account?verification=${token.token}&name=${token.name}&surname=${token.surname}`,
        }
      );

      const options = mailOptions("Account Activation", token.email, template);


      try {
        const info = await wrappedSendMail(options);
        console.log("Email sent: " + info.response);
      } catch (err) {
        throw new Error("Process of sending email has failed.");
      }


      {/*transporter.sendMail(options, (err, info) => {
        if (err) {
          console.log(err);
          throw new ApolloError(
            "Process of sending email has failed",
            "EMAIL_ERROR"
          );
        } else {
          console.log("Message sent: " + info.response);
        }
      }); */}

      return "ok";
    },
  },
  Token: {},
};
