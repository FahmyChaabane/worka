import { MongoDataSource } from "apollo-datasource-mongodb";

class SkillModel extends MongoDataSource {
  async findByName(filter) {
    return await this.model.find({ name: new RegExp(`.*${filter}.*`, "i") });
  }

  async findBySkillID(_id) {
    return await this.model.findOne({ _id });
  }
}

export default SkillModel;
