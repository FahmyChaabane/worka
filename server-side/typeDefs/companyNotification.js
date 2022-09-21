import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    companyNotifications: [CompanyNotification]
  }

  extend type Mutation {
    readCompanyNotification(notificationId: ID!): CompanyNotification
  }

  type CompanyNotification {
    id: ID!
    message: String!
    read: Boolean!
    link: String
    createdAt: Date!
    dispatcher: UserDispatcher
  }

  type UserDispatcher {
    name: String!
    surname: String!
    avatar: String
    createdAt: Date!
  }
`;
