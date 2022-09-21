import { MongoDataSource } from "apollo-datasource-mongodb";

class TextQuestionnaireSubmissionModel extends MongoDataSource {
  async findByTextQuestSub(_id) {
    return await this.model.findOne({ _id });
  }

  async findByCoupleQuestionnaireIDUserID(questionnaire, user) {
    return await this.model.findOne({ questionnaire, user });
  }

  async findByQuestionnaireUserCandidate(
    questionnaire,
    user,
    candidate = null
  ) {
    return await this.model.findOne({ questionnaire, user, candidate });
  }

  async findByQuestionId(idQ) {
    return await this.model.find({ questionnaire: idQ });
  }

  async addTextQuestSub(data) {
    const submission = new this.model(data);
    return await submission.save();
  }
}

export default TextQuestionnaireSubmissionModel;
