import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    companies(id: String): [Company!]!
    company(id: String): Company!
    loggedInCompany: Company!
  }

  extend type Mutation {
    companySignup(tokenID: String!): Company
    companyLogin(data: CompanyLoginInput!): String
    companyLogout: String
    completeCompanyProfile(data: CompanyProfileInput!): Company!
    companyForgotPassword(email: String!): String
    companyResetPassword(resetPwToken: String!, newPw: String!): String
  }

  enum companyType {
    LLC
    Corporation
    Government
  }

  type Token {
    token: String
  }

  input CompanyLoginInput {
    email: String!
    password: String!
  }

  input CompanyProfileInput {
    type: companyType
    industry: String
    size: String
    website: String
    description: String
    location: AddressInput
    phoneNumber: PhoneNumberInput
    foundationDate: FoundationDateInput
    manager: ManagerInput
    subscriptionPlan: String
  }

  input AddressInput {
    country: String
    city: String
    address: String
  }

  input FoundationDateInput {
    foundationDay: Int
    foundationMonth: String
    foundationYear: Int
  }

  type FoundationDateSchema {
    foundationDay: Int!
    foundationMonth: String!
    foundationYear: Int!
  }

  input PhoneNumberInput {
    countryCode: String
    phoneNumber: String
  }

  input ManagerInput {
    managerFirstName: String!
    managerLastName: String!
    managerPhoneNumber: ManagerPhoneNumberInput!
    managerRole: String!
  }

  input ManagerPhoneNumberInput {
    managerCountryCode: String!
    managerPhoneNumber: String!
  }

  type Company {
    industry: Industry

    id: ID
    name: String
    email: String
    type: companyType
    manager: ManagerSchema
    website: String
    foundationDate: FoundationDateSchema
    state: String
    size: String
    location: LocationSchema
    phoneNumber: PhoneNumberSchema
    avatar: String
    description: String
    completed: Boolean
    verified: Boolean
    createdAt: Date
    updatedAt: Date

    employees: [FollowCompany!]
    jobOffers: [JobOffer!]
    questions: [TextQuestionnaire!]
  }

  type LocationSchema {
    country: String!
    city: String!
    address: String!
  }

  type PhoneNumberSchema {
    countryCode: String!
    phoneNumber: String!
  }

  type ManagerSchema {
    managerFirstName: String!
    managerLastName: String!
    managerRole: String!
    managerPhoneNumber: MangerPhoneNumberSchema!
  }

  type MangerPhoneNumberSchema {
    managerCountryCode: String!
    managerPhoneNumber: String!
  }

  type IndustrySchema {
    id: ID!
    name: String!
  }
`;
