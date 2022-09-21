import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    userNotifications(id: String): [UserNotification!]!
  }

  extend type Mutation {
    markAsSeenNotification(notificationID: ID!): UserNotification!
  }

  type UserNotification {
    dispatcher: User!

    id: ID!
    text: String!
    route: String!
    seen: Boolean!

    createdAt: Date!
    updatedAt: Date!
  }
`;
