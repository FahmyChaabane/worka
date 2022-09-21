import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    questionFaqs(id: String): [QuestionFaq!]!
  }

  type QuestionFaq {
    user: User!
    company: Company!

    id: ID!
    question: String!
    createdAt: Date!
    updatedAt: Date!

    answers: [AnswerFaq!]!
  }
`;
