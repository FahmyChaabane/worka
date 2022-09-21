import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    videoQuestionnaire(id: ID!): VideoQuestionnaire
    videoQuestionnaires: [VideoQuestionnaire]
    myVideoQuestionnaires: [VideoQuestionnaire]
    getVideoQuestionnaireByID(questionnaireID: ID): VideoQuestionnaire
    paginatedVideoQuestionnaires(
      offset: Int
      limit: Int
      input: String
    ): VideoQuestionnairePage
  }

  extend type Mutation {
    createVideoQuestionnaire(
      data: VideoQuestionnaireInput!
      companyID: ID
    ): VideoQuestionnaire
    sendVideoQuestionnaire(emails: [String]!, questionnaireID: ID!): String!
    editVideoQuestionnaire(
      questionnaireID: ID
      data: VideoQuestionnaireInput!
    ): String!
  }

  type VideoQuestionnairePage {
    questionnaires: [VideoQuestionnaire]
    pageNumber: Int
    count: Int
  }

  input VideoQuestionnaireInput {
    title: String!
    description: String!
    questions: [VideoQuestionInput!]
  }

  type VideoQuestionnaire {
    id: ID!
    company: Company
    title: String!
    description: String!
    link: String
    questions: [VideoQuestion!]
  }

  type VideoQuestion {
    questionIndex: Int
    question: String!
    duration: Int!
  }

  input VideoQuestionInput {
    questionIndex: Int
    question: String!
    duration: Int!
  }
`;
