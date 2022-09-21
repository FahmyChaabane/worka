import { MongoDataSource } from "apollo-datasource-mongodb";
import { OwnSkill } from "../models/ownSkill";

class OwnSkillModel extends MongoDataSource {
  async addSkillUser(skillID, UserID) {
    const ownSkill = new OwnSkill({
      skill: skillID,
      user: UserID,
    });
    return await ownSkill.save();
  }

  async deleteSkill(ownSkillRef) {
    return await this.model.findOneAndDelete({ _id: ownSkillRef });
  }

  async findCoupleByIDs(skillID, UserID) {
    return await this.model.findOne({
      skill: skillID,
      user: UserID,
    });
  }

  async editOwnSkillModel(data, skillID, userID) {
    return await this.model.findOneAndUpdate(
      { user: userID, skill: skillID },
      {
        $set: {
          ...data,
        },
      },
      {
        new: true,
      }
    );
  }
}

export default OwnSkillModel;
