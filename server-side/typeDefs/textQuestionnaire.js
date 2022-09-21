import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    textQuestionnaire(id: ID!): TextQuestionnaire
    textQuestionnaires: [TextQuestionnaire]
    myTextQuestionnaires: [TextQuestionnaire]
    paginatedTextQuestionnaires(
      offset: Int
      limit: Int
      input: String
    ): TextQuestionnairePage
    getQuestionnaireByID(questionnaireID: ID): TextQuestionnaire
  }

  extend type Mutation {
    createTextQuestionnaire(
      data: TextQuestionnaireInput!
      companyID: ID
    ): TextQuestionnaire
    sendTextQuestionnaireToUser(
      emails: [String]!
      questionnaireID: ID!
    ): String!
    sendTextQuestionnaireToManager(
      emails: [String]!
      questionnaireID: ID!
    ): String!
    editTextQuestionnaire(
      questionnaireID: ID
      data: TextQuestionnaireInput!
    ): String!
  }

  type TextQuestionnairePage {
    questionnaires: [TextQuestionnaire]
    pageNumber: Int
    count: Int
  }

  input TextQuestionnaireInput {
    title: String!
    description: String!
    receiver: String!
    questions: [QuestionInput!]
  }

  type TextQuestionnaire {
    id: ID
    company: Company
    title: String
    receiver: String
    description: String
    link: String
    questions: [Question!]
    createdAt: Date!
    updatedAt: Date!
  }

  enum QuestionType {
    PARAGRAPH
    MULTI
    SINGLE
    SCALE
  }

  type Question {
    questionIndex: Int
    type: QuestionType!
    question: String!
    choices: [Choice]
  }

  input QuestionInput {
    questionIndex: Int
    type: QuestionType!
    question: String!
    choices: [ChoiceInput]
  }

  type Choice {
    choiceIndex: Int
    choiceQuestion: String!
  }

  input ChoiceInput {
    choiceIndex: Int
    choiceQuestion: String
  }
`;
