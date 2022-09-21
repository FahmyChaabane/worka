import path from "path";
import answerFaq from "./answerFaq";
import applyJobOffer from "./applyJobOffer";
import commentProject from "./commentProject";
import company from "./company";
import followCompany from "./followCompany";
import followUser from "./followUser";
import industry from "./industry";
import jobOffer from "./jobOffer";
import offerSkill from "./offerSkill";
import ownSkill from "./ownSkill";
import project from "./project";
import questionFaq from "./questionFaq";
import review from "./review";
import saveCompany from "./saveCompany";
import saveJobOffer from "./saveJobOffer";
import scalars from "./scalars";
import skill from "./skill";
import token from "./token";
import user from "./user";
import userNotification from "./userNotification";
import textQuestionnaire from "./textQuestionnaire";
import textQuestionnaireSubmissions from "./textQuestionnaireSubmissions";
import videoQuestionnaire from "./videoQuestionnaire";
import userQuestionnaire from "./userQuestionnaire";
import companyNotification from "./companyNotification";

const helloworld = {
  Query: {
    hello: () => "Hello world !", // si au sein du schema String sans '!'.. meme si le resolver n'est pas definie, ça cause pas une exp et retourne 'null'.. si ! existe et on supprime le query du resolver: Cannot return null
  },
  Mutation: {
    singleUpload: async (parent, { file }) => {
      console.log("HIT SERVER");
      const { createReadStream, filename, mimetype, encoding } = await file;
      // console.log("createReadStream", createReadStream);
      console.log("filename", filename);
      console.log("mimetype", mimetype);
      console.log("encoding", encoding);
      // Do work 💪

      const stream = createReadStream();

      const imgPath = `${Date.now()}-file.${mimetype.replace("image/", "")}`;
      const out = require("fs").createWriteStream(
        path.join(process.env.PWD, "/public/images", imgPath)
      );
      stream.pipe(out);

      return JSON.stringify({ filename, mimetype, encoding, imgPath });
    },
  },
};

export default [
  helloworld,
  scalars,
  token,
  user,
  userNotification,
  userQuestionnaire,
  ownSkill,
  skill,
  review,
  followCompany,
  company,
  industry,
  saveCompany,
  followUser,
  applyJobOffer,
  jobOffer,
  offerSkill,
  saveJobOffer,
  project,
  commentProject,
  questionFaq,
  answerFaq,
  textQuestionnaire,
  textQuestionnaireSubmissions,
  videoQuestionnaire,
  companyNotification,
];
