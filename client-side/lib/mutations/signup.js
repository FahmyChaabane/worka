import { gql } from "@apollo/client";

export const SIGN_USER = gql`
  mutation SIGN_USER($signupPhaseZeroData: tokenContent!) {
    signupPhaseZero(data: $signupPhaseZeroData)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation CREATE_ACCOUNT($createUserAccountTokenId: ID!) {
    createUserAccount(tokenID: $createUserAccountTokenId) {
      name
      surname
      email
    }
  }
`;

export const COMPLETE_USER_ACCOUNT = gql`
  mutation ($completeUserAccountData: accountContent!) {
    completeUserAccount(data: $completeUserAccountData) {
      id
      name
      surname
      email
      expectations
      gender
      location {
        country
        city
        address
      }
      born {
        day
        month
        year
      }
      domain {
        name
        jobTitle
      }
      phoneNumber {
        countryCode
        number
      }
      education {
        degree
        from {
          month
          year
        }
        to {
          month
          year
        }
        schoolName
        stillStudying
      }
      work {
        post
        from {
          month
          year
        }
        to {
          month
          year
        }
        companyName
        stillWorking
      }
      avatar
      bio2
      completed
    }
  }
`;
