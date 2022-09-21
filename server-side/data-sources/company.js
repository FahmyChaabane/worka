import { MongoDataSource } from "apollo-datasource-mongodb";

class CompanyModel extends MongoDataSource {
  async findByCompanyID(_id) {
    return await this.model.findOne({ _id });
  }

  async addCompany(data) {
    const company = new this.model({ ...data });
    return await company.save();
  }

  async fillCompanyModel(data, companyID) {
    return await this.model.findOneAndUpdate(
      { _id: companyID },
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

  async findByEmail(email) {
    const company = await this.model.findOne({ email });
    return company;
  }

  async validatePwd(PW, hashedPW) {
    return this.model.validatePwd(PW, hashedPW);
  }

  async generateJWT(id) {
    return await this.model.generateJWT({ id });
  }

  generateResetPasswordToken() {
    return this.model.generateResetPasswordToken();
  }
}

export default CompanyModel;
