import { MongoDataSource } from "apollo-datasource-mongodb";

class UserModel extends MongoDataSource {
  async findByUserID(_id) {
    return await this.model.findOne({ _id });
  }

  async findByEmail(email) {
    return await this.model.findOne({ email });
  }

  async findByResetToken(token) {
    return await this.model.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
  }

  async addUser(data) {
    const user = new this.model({ ...data });
    return await user.save();
  }

  async fillUserModel(data, userID) {
    return await this.model.findOneAndUpdate(
      { _id: userID },
      {
        $set: {
          ...data,
          completed: true,
        },
      },
      {
        new: true,
      }
    );
  }

  async editUserModel(data, userID) {
    return await this.model.findOneAndUpdate(
      { _id: userID },
      {
        $set: data,
      },
      {
        new: true,
      }
    );
  }

  async validatePwd(passedPWD, userPWD) {
    return this.model.validatePwd(passedPWD, userPWD);
  }

  async generateJWT(id) {
    return await this.model.generateJWT({ id });
  }

  async filterUsers(filter) {
    const regEx = new RegExp(`.*${filter}.*`, "i");
    return await this.model
      .find()
      .or([{ name: regEx }, { surname: regEx }, { email: regEx }]);
  }
}

export default UserModel;
