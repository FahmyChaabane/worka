import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    saveCompanies(id: String): [SaveCompany!]!
  }

  type SaveCompany {
    saved: Company!

    id: ID!
    createdAt: Date!
    updatedAt: Date!
  }
`;
