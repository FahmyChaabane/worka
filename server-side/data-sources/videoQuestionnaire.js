import { MongoDataSource } from "apollo-datasource-mongodb";

class VideoQuestionnaireModel extends MongoDataSource {
  async findByVideoQuestionnaireID(_id) {
    return await this.model.findOne({ _id });
  }

  async editVideoQuestionnaire(data, questionnaireID) {
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

export default VideoQuestionnaireModel;
