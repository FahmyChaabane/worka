import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    answerFaqs(id: String): [AnswerFaq!]!
  }

  type AnswerFaq {
    question: QuestionFaq!
    user: User!

    id: ID!
    answer: String!
    createdAt: Date!
    updatedAt: Date!
  }
`;
