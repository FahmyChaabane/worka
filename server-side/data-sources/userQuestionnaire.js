import { MongoDataSource } from "apollo-datasource-mongodb";

class UserQuestionnaireModel extends MongoDataSource {
  async add(email, questionnaire, receiver, sender = null) {
    const uq = new this.model({ questionnaire, email, receiver, sender });
    return await uq.save();
  }

  async findByEmailAndQuestionnaire(email, questionnaire) {
    return await this.model.findOne({ questionnaire, email });
  }

  async findByEmail_Questionnaire_Sender(email, questionnaire, sender) {
    return await this.model.findOne({ questionnaire, email, sender });
  }

  async findByQuestionId(idQ) {
    return await this.model.find({ questionnaire: idQ });
  }

  async deleteAnsweredQuest(email, questionnaire, user = null) {
    return await this.model.deleteOne({ email, questionnaire, sender: user });
  }
}

export default UserQuestionnaireModel;
