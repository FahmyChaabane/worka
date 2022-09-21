import { MongoDataSource } from "apollo-datasource-mongodb";

class TokenModel extends MongoDataSource {
  getToken(tokenID) {
    return this.model.findOne({ token: tokenID });
  }

  async addToken(data) {
    const token = new this.model({ ...data });
    return await token.save();
  }

  async findByEmail(email) {
    const token = await this.model.findOne({ email });
    return token;
  }

  async deleteToken(email) {
    await this.model.deleteOne({ email });
  }
}

export default TokenModel;
