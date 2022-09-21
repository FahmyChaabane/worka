import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getTextQuestionnaireSubmissionsByID(
      questionnaireSubmissionID: ID!
    ): TextQuestionnaireSubmission
    textQuestionnaireSubmissionsByQuestionnaireID(
      questionnaireID: ID!
    ): [TextQuestionnaireSubmission]
    submissionCount(questionnaireID: ID!): Int
  }

  extend type Mutation {
    submitTextQuestionnaire(
      data: TextQuestionnaireSubmissionInput!
    ): TextQuestionnaireSubmission!
  }

  input TextQuestionnaireSubmissionInput {
    questionnaire: ID!
    response: [ResponseInput!]!
    userID: ID
  }

  type TextQuestionnaireSubmission {
    id: ID
    user: User
    candidate: User
    questionnaire: TextQuestionnaire
    response: [Response]
    createdAt: Date
    updatedAt: Date
  }

  enum QuestionType {
    PARAGRAPH
    MULTI
    SINGLE
    SCALE
  }

  type Response {
    type: QuestionType
    question: String
    response: String
    choices: [Choice]
  }

  input ResponseInput {
    type: QuestionType
    question: String
    response: String
    choices: [ChoiceInput]
  }

  type Choice {
    choiceQuestion: String
  }

  input ChoiceInput {
    choiceQuestion: String
  }
`;
