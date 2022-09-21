import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    hello: String
    currentUser: User!
    getUserProfile(userID: ID!): User!
    filterUsers(filter: String!): [User!]!
    users(id: String): [User!]!
    userQuestioned(qIds: [ID]): [User!]!
    getUserByID(userID: ID!): User
  }

  extend type Mutation {
    createUserAccount(tokenID: ID!): User!
    login(data: loginContent!): String!
    completeUserAccount(data: accountContent!): User!
    editUserAccountData(data: accountEditedDataContent!): User!
    setResetPasswordToken(email: String!): String!
    resetPassword(data: resetPasswordContent!): String!
    singleUpload(file: Upload!): String!
    followUser(profileID: ID!): FollowUser!
    unfollowUser(profileID: ID!): FollowUser!
  }

  input accountContent {
    expectations: [userExpectations!]!
    gender: genderType!
    location: LocationContent!
    born: BornConent!
    domain: DomainContent!
    phoneNumber: PhoneNumberContent!
    education: [EducationContent!]!
    work: [WorkContent!]!
    avatar: Upload
    bio2: String!
  }

  input accountEditedDataContent {
    name: String
    surname: String
    expectations: [userExpectations!]
    gender: genderType
    location: LocationContent
    born: BornConent
    domain: DomainContent
    phoneNumber: PhoneNumberContent
    education: [EducationContent!]
    work: [WorkContent!]
    avatar: Upload
    bio: String
    bio2: String
  }

  input loginContent {
    email: String!
    password: String!
  }

  input resetPasswordContent {
    token: String!
    password: String!
  }

  type UploadedFileResponse {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }

  enum userExpectations {
    expc1
    expc2
    expc3
    expc4
  }

  enum genderType {
    Female
    Male
  }

  type User {
    id: ID!
    name: String
    surname: String!
    email: String!
    expectations: [userExpectations!]
    gender: genderType
    location: Location
    born: Born
    domain: Domain
    phoneNumber: PhoneNumber
    education: [Education!]
    work: [Work!]
    avatar: String
    bio: String
    bio2: String
    language: String!
    completed: Boolean!
    createdAt: Date!
    updatedAt: Date!

    skills: [OwnSkill!]!
    followedcompanies: [FollowCompany!]!
    followedUsers: [FollowUser!]!
    savedcompanies: [SaveCompany!]!
    appliedJobOffers: [ApplyJobOffer!]!
    savedJobOffers: [SaveJobOffer!]!
    projects: [Project!]!
    notifications(offset: Int, limit: Int): [UserNotification!]!
    answeredQuestions: [TextQuestionnaireSubmission!]!
    toBeSentQuestions: [UserQuestionnaire!]!
    toBeAnsweredQuestions: [UserQuestionnaire!]!
  }

  type Location {
    country: String
    city: String
    address: String
  }
  input LocationContent {
    country: String!
    city: String!
    address: String!
  }

  type Born {
    day: String
    month: String
    year: String
  }

  input BornConent {
    day: String!
    month: String!
    year: String!
  }

  type Domain {
    name: String
    jobTitle: String
  }

  input DomainContent {
    name: String!
    jobTitle: String!
  }

  type PhoneNumber {
    countryCode: String
    number: String
  }

  input PhoneNumberContent {
    countryCode: String!
    number: String!
  }

  type Education {
    schoolName: String
    from: FromTo
    to: FromTo
    degree: String
    stillStudying: Boolean
  }

  input EducationContent {
    schoolName: String!
    from: FromToContent!
    to: FromToContent!
    degree: String!
    stillStudying: Boolean!
  }

  type Work {
    companyName: String
    from: FromTo
    to: FromTo
    post: String
    stillWorking: Boolean
  }

  input WorkContent {
    companyName: String!
    from: FromToContent!
    to: FromToContent!
    post: String!
    stillWorking: Boolean!
  }

  type FromTo {
    month: String
    year: String
  }

  input FromToContent {
    month: String!
    year: String!
  }
`;
