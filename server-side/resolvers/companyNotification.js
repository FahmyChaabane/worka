import { UserInputError } from "apollo-server-express";
import authorize from "../utils/isAuthCompany";
import { User } from "../models/user";

export default {
  Query: {
    companyNotifications: async (parent, args, context, info) => {
      const company = authorize(context.req);

      const notifications =
        await context.dataSources.companyNotificationModel.findAllByCompanyId(
          company._id
        );
      return notifications;
    },
  },
  Mutation: {
    readCompanyNotification: async (
      _,
      { notificationId },
      { dataSources, req }
    ) => {
      const auth = authorize(req);

      const notification = await dataSources.companyNotificationModel.findById(
        notificationId
      );
      if (!notification) throw new UserInputError("Invalid notification!");
      return await dataSources.companyNotificationModel.setRead(notificationId);
    },
  },
  CompanyNotification: {
    dispatcher: async (parent, args, ctx, profile) => {
      const { dispatcher: userId } = parent;
      return await User.findOne({ _id: userId });
    },
  },
};
