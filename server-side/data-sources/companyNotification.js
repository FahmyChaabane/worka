import { MongoDataSource } from "apollo-datasource-mongodb";

class CompanyNotificationModel extends MongoDataSource {
  async findById(_id) {
    return await this.model.findOne({ _id });
  }

  async findAllByCompanyId(companyId) {
    return await this.model
      .find({ company: companyId })
      .sort({ createdAt: -1 });
  }

  async add(data) {
    const notification = new this.model(data);
    await notification.save();
  }

  async setRead(notificationId) {
    return await this.model.findOneAndUpdate(
      { _id: notificationId },
      {
        $set: {
          read: true,
        },
      },
      {
        new: true,
      }
    );
  }
}

export default CompanyNotificationModel;
