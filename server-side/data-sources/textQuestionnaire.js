import { MongoDataSource } from "apollo-datasource-mongodb";

class TextQuestionnaireModel extends MongoDataSource {
  async findByTextQuestionnaireID(_id) {
    return await this.model.findOne({ _id });
  }

  async editTextQuestionnaire(data, questionnaireID) {
    return await this.model.findOneAndUpdate(
      { _id: questionnaireID },
      {
        $set: data,
      },
      {
        new: true,
      }
    );
  }
}

export default TextQuestionnaireModel;
