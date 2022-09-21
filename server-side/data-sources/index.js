import { Token } from "../models/token";
import { User } from "../models/user";
import { Company } from "../models/company";
import { FollowUser } from "../models/followUser";
import { Skill } from "../models/skill";
import { OwnSkill } from "../models/ownSkill";
import { Review } from "../models/review";
import { UserNotification } from "../models/userNotification";
import { TextQuestionnaire } from "../models/textQuestionnaire";
import { TextQuestionnaireSubmission } from "../models/textQuestionnaireSubmission";
import { VideoQuestionnaire } from "../models/videoQuestionnaire";
import { UserQuestionnaire } from "../models/userQuestionnaire";
import { CompanyNotification } from "../models/companyNotification";

import TokenModel from "./token";
import UserModel from "./user";
import CompanyModel from "./company";
import FollowUserModel from "./followUser";
import SkillModel from "./skill";
import OwnSkillModel from "./ownSkill";
import ReviewModel from "./review";
import UserNotificationModel from "./userNotification";
import TextQuestionnaireModel from "./textQuestionnaire";
import TextQuestionnaireSubmissionModel from "./textQuestionnaireSubmission";
import VideoQuestionnaireModel from "./videoQuestionnaire";
import UserQuestionnaireModel from "./userQuestionnaire";
import CompanyNotificationModel from "./companyNotification";

export default () => ({
  userModel: new UserModel(User),
  tokenModel: new TokenModel(Token),
  companyModel: new CompanyModel(Company),
  followUserModel: new FollowUserModel(FollowUser),
  skillModel: new SkillModel(Skill),
  ownSkillModel: new OwnSkillModel(OwnSkill),
  reviewModel: new ReviewModel(Review),
  userNotificationModel: new UserNotificationModel(UserNotification),
  textQuestionnaireModel: new TextQuestionnaireModel(TextQuestionnaire),
  textQuestionnaireSubmissionModel: new TextQuestionnaireSubmissionModel(
    TextQuestionnaireSubmission
  ),
  videoQuestionnaireModel: new VideoQuestionnaireModel(VideoQuestionnaire),
  userQuestionnaireModel: new UserQuestionnaireModel(UserQuestionnaire),
  companyNotificationModel: new CompanyNotificationModel(CompanyNotification),
});
