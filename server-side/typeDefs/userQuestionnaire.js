import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    userQuestionnaires: [UserQuestionnaire]
  }

  type UserQuestionnaire {
    id: ID!
    email: String!
    questionnaire: TextQuestionnaire!
    receiver: String!
    sender: User
  }
`;
