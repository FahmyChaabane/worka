import { MongoDataSource } from "apollo-datasource-mongodb";

class UserNotificationModel extends MongoDataSource {
  async findByNotificationID(_id) {
    return await this.model.findOne({ _id });
  }

  async addNotification(data) {
    const notification = new this.model(data);
    await notification.save();
  }

  async markAsSeenNotification(notificationID) {
    return await this.model.findOneAndUpdate(
      { _id: notificationID },
      {
        $set: {
          seen: true,
        },
      },
      {
        new: true,
      }
    );
  }
}

export default UserNotificationModel;
