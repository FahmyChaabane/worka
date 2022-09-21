import { graphqlUploadExpress } from "graphql-upload";
import db from "./config/db";
import apolloAPI from "./config/apollo";
import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import singup from "./routes/signup";
import auth from "./routes/auth";
import home from "./routes/home";
import { User } from "./models/user";
import { Company } from "./models/company";
import { Skill } from "./models/skill";
import { OwnSkill } from "./models/ownSkill";
import { Review } from "./models/review";
import { JobOffer } from "./models/jobOffer";
import { ApplyJobOffer } from "./models/applyJobOffer";
import { OfferSkill } from "./models/offerSkill";
import { Project } from "./models/project";
import { CommentProject } from "./models/commentProject";
import { FollowUser } from "./models/followUser";
import { SaveJobOffer } from "./models/saveJobOffer";
import { SaveCompany } from "./models/saveCompany";
import { Industry } from "./models/industry";
import { QuestionFaq } from "./models/questionFaq";
import { AnswerFaq } from "./models/answerFaq";
import errorHandler from "./routes/errorHandler";

const { APP_PORT } = process.env;

(async () => {
  try {
    await db();

    const server = apolloAPI();
    await server.start();

    const app = express();
    var corsOptions = {
      origin: [
        process.env.USER_FRONT_HOST,
        process.env.COMPANY_FRONT_HOST,
        "https://studio.apollographql.com",
      ],
      credentials: true, // <-- REQUIRED backend setting
    };
    app.use(cookieParser());
    app.use(graphqlUploadExpress());
    server.applyMiddleware({ app, cors: corsOptions });

    // const user = new User({
    //   name: "Fahmi",
    //   surName: "Cha Cha",
    //   email: "chaabane@outlook.jp",
    //   location: {
    //     country: "Canada",
    //     city: "Montreal",
    //   },
    // });
    // await user.save();

    // console.log(user.id);
    // await User.findOneAndUpdate(
    //   { _id: "6110fd8f5bc51e3e1ad686a2" },
    //   {
    //     $set: {
    //       location: {
    //         country: "United States",
    //         city: "Chigago",
    //       },
    //     },
    //   },
    //   { useFindAndModify: false }
    // );
    // const user1 = await User.findOne({ _id: "6110fd8f5bc51e3e1ad686a2" });
    // const user2 = await User.findOne({ _id: "611106b716720a46d8e064fb" });
    // console.log("user1", user1);
    // console.log("user2", user2);
    // const company = new Company({
    //   name: "Oracle",
    //   email: "Oracle@email.com",
    //   type: "LLC",
    // });
    // await company.save();
    // const company = await Company.findOne({ _id: "6111033404f5c443711f12ae" });
    // console.log("company", company);
    // const follow1 = FollowCompany({
    //   follower: user2.id,
    //   followed: company.id,
    // });
    // // const follow2 = FollowCompany({
    // //   follower: user.id,
    // //   followed: company.id,
    // // });
    // await follow1.save();

    // const skill = new Skill({
    //   name: "Python",
    // });
    // await skill.save();

    // const ownSkill = new OwnSkill({
    //   skill: "6111336ac35f226f01c4a7ec",
    //   user: "6110fd8f5bc51e3e1ad686a2",
    //   seniority: 30,
    // });

    // await ownSkill.save();

    // const review1 = Review({
    //   reviewer: "611106b716720a46d8e064fb",
    //   ownSkill: "611141276bb00f7b73a993c4",
    //   relationship: "Manager",
    //   where: "Microsoft France",
    //   description:
    //     "He was really so good that he could singly manage many stuffs by himself without asking for my help or any other collegues.",
    //   rate: 3,
    // });

    // const ownSkill = await OwnSkill.findOne({
    //   _id: "611141276bb00f7b73a993c4",
    // });
    // ownSkill.globalRate.push(review1.rate);
    // console.log(ownSkill);
    // await ownSkill.save();
    // await review1.save();

    // const review2 = Review({
    //   reviewer: "611117dd1b15075cb927eb39",
    //   ownSkill: "611141276bb00f7b73a993c4",
    //   relationship: "Collegue Developer",
    //   where: "Google France",
    //   description: "He was not so bad.",
    //   rate: 5,
    // });

    // const ownSkill = await OwnSkill.findOne({
    //   _id: "611141276bb00f7b73a993c4",
    // });
    // ownSkill.globalRate.push(review2.rate);
    // console.log(ownSkill);
    // await ownSkill.save();
    // await review2.save();

    // const jobOffer = new JobOffer({
    //   title: "Backend Architect",
    //   isRemote: false,
    //   jobDetails: "private",
    //   company: "6111033404f5c443711f12ae",
    // });

    // await jobOffer.save();

    // const applyJobOffer = new ApplyJobOffer({
    //   jobOffer: "6112c91c2865c0bca6d93589",
    //   user: "611106b716720a46d8e064fb",
    // });

    // applyJobOffer.save();

    // const offerSkill = OfferSkill({
    //   jobOffer: "611193d2d1dfb6bfe8ed25f8",
    //   skill: "6111336ac35f226f01c4a7ec",
    // });

    // await offerSkill.save();

    // const project = new Project({
    //   user: "6110fd8f5bc51e3e1ad686a2",
    //   name: "K2Lis",
    //   about: "BlockChain magic",
    // });

    // await project.save();

    // const comment = new CommentProject({
    //   user: "611117dd1b15075cb927eb39",
    //   project: "6112bbcc41a6baaeb95e1519",
    //   comment: "Good job maaaaaaan",
    // });

    // await comment.save();

    // const followUser = new FollowUser({
    //   follower: "611117dd1b15075cb927eb39",
    //   followed: "6110fd8f5bc51e3e1ad686a2",
    // });
    // await followUser.save();

    // const saveJobOffer = new SaveJobOffer({
    //   jobOffer: "6112c91c2865c0bca6d93589",
    //   user: "6110fd8f5bc51e3e1ad686a2",
    // });

    // await saveJobOffer.save();

    // const saveCompany = new SaveCompany({
    //   saver: "611117dd1b15075cb927eb39",
    //   saved: "6111033404f5c443711f12ae",
    // });

    // await saveCompany.save();

    // const industry = new Industry({
    //   name: "DB management",
    // });

    // const company = await Company.findOne({ _id: "6111033404f5c443711f12ae" });
    // company.industry = industry.id;
    // industry.save();
    // company.save();

    // const questionFaq = new QuestionFaq({
    //   question: "how you doing ?",
    //   user: "611106b716720a46d8e064fb",
    //   company: "6111033404f5c443711f12ae",
    // });
    // await questionFaq.save();

    // const answerFaq = new AnswerFaq({
    //   question: "6112dbcee47791d224cf08ab",
    //   user: "6110fd8f5bc51e3e1ad686a2",
    //   answer: "it's alignt",
    // });
    // await answerFaq.save();

    const whitelist = [
      process.env.USER_FRONT_HOST,
      process.env.COMPANY_FRONT_HOST,
      "https://studio.apollographql.com",
    ];
    const restCorsOptions = {
      origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      // // allowedHeaders: ["content-length", "content-type", "x-auth"],
      // exposedHeaders: ["content-length", "content-type", "x-auth"],
    };

    app.use(express.static(path.join(__dirname, "public")));

    app.use(cors(restCorsOptions));
    app.use(express.json());
    app.use("/api/signup", singup);
    app.use("/api/auth", auth);
    app.use("/", home);
    app.use(errorHandler);

    app.listen(APP_PORT, () =>
      console.log(
        `🚀 GraphQL Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`
      )
    );
  } catch (err) {
    console.log("error", err);
  }
})();
