import { UserInputError } from "apollo-server-express";
import { UserNotification } from "../models/userNotification";
import { User } from "../models/user";

export default {
  Query: {
    userNotifications: async () => await UserNotification.find(),
  },
  Mutation: {
    markAsSeenNotification: async (_, { notificationID }, { dataSources }) => {
      const notification =
        await dataSources.userNotificationModel.findByNotificationID(
          notificationID
        );
      if (!notification) throw new UserInputError("Invalid notification!");
      return await dataSources.userNotificationModel.markAsSeenNotification(
        notificationID
      );
    },
  },
  UserNotification: {
    dispatcher: async (parent, args, ctx, profile) => {
      const { dispatcher: userID } = parent;
      return await User.findOne({ _id: userID });
    },
  },
};
