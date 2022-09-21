import { User } from "../models/user";
import wrappedSendMail, { mailOptions } from "../config/mailer/config";
import express from "express";
import ejs from "ejs";
import path from "path";
import Api404Error from "./api404Error";
import Api400Error from "./api400Error";
import { Company } from "../models/company";
import { Token } from "../models/token";
import { randomBytes } from "crypto";
import asyncMiddleware from "./asyncMiddleware";
const router = express.Router();

// create token
router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      throw new Api400Error(
        "An account with the specified email already exist!"
      );

    // const company = await Company.findOne({ email: req.body.email });
    // if (company)
    //   return res
    //     .status(400)
    //     .send("An account with the specified email already exist!");

    const tokenExist = await Token.findOne({ email: req.body.email });
    if (tokenExist) await Token.deleteOne({ email: req.body.email });

    const token = new Token(req.body);
    await token.save();

    const template = await ejs.renderFile(
      path.join(
        process.env.PWD,
        "/public/templates/userActivateAccountTemplate.ejs"
      ),
      {
        name: token.name,
        surname: token.surname,
        link: `${process.env.USER_FRONT_HOST}/account?verification=${token.token}&name=${token.name}&surname=${token.surname}`,
      }
    );

    const options = mailOptions("Account Activation", token.email, template);

    try {
      const info = await wrappedSendMail(options);
      console.log("Email sent: " + info.response);
    } catch (err) {
      throw new Error("Process of sending email has failed.");
    }

    res.send("token served, email sent!");
  })
);

// activate account
router.post(
  "/activate",
  asyncMiddleware(async (req, res) => {
    const token = await Token.findOne({ token: req.body.token });
    if (!token)
      throw new Api400Error(
        "Error when fetching the user, either the verification delay has expired or you have not clicked the most recent verification link!"
      );

    const userExist = await User.findOne({ email: token.email });
    if (userExist)
      throw new Api400Error(
        "The account related to the activation link was already activated!"
      );

    // const companyExist = await Company.findOne({ email: req.body.email });
    // if (companyExist)
    //   res.status(400).send("An account with the specified email already exist!");

    const user = new User({
      name: token.name,
      surname: token.surname,
      email: token.email,
      password: token.password,
    });
    await user.save();

    res.send("account activated!");
  })
);

// router.post("/completeSignup", async (req, res) => {

//   res.send("user account completed!");
// });

// send email reset password
router.post(
  "/pwdResetRequest",
  asyncMiddleware(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      throw new Api404Error("There is no user account with such email address");

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

    const options = mailOptions("Reset Password", req.body.email, template);

    try {
      const info = await wrappedSendMail(options);
      console.log("Email sent: " + info.response);
    } catch (err) {
      throw new Error("Process of sending email has failed.");
    }

    res.send("password resetemail was sent!");
  })
);

// reset password
router.post(
  "/resetPassword",
  asyncMiddleware(async (req, res) => {
    const user = await User.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user)
      throw new Api400Error("Password reset token is invalid or has expired.");

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.send("password reseted!");
  })
);

export default router;
