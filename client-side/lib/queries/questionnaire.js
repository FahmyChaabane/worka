import { gql } from "@apollo/client";

export const GET_TEXT_QUESTIONNAIRE = gql`
  query ($textQuestionnaireId: ID!) {
    getQuestionnaireByID(questionnaireID: $textQuestionnaireId) {
      id
      title
      receiver
      company {
        id
        name
        avatar
      }
      questions {
        questionIndex
        question
        type
        choices {
          choiceIndex
          choiceQuestion
        }
      }
    }
  }
`;

export const GET_TEXT_QUESTIONNAIRE_SUBMISSION = gql`
  query ($questionnaireSubmissionId: ID!) {
    getTextQuestionnaireSubmissionsByID(
      questionnaireSubmissionID: $questionnaireSubmissionId
    ) {
      id
      questionnaire {
        id
        title
        company {
          id
          name
          avatar
        }
      }
      response {
        question
        type
        response
        choices {
          choiceQuestion
        }
      }
      candidate {
        id
        email
      }
    }
  }
`;
