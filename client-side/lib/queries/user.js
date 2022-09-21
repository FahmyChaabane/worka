import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query _ME($limit: Int, $offset: Int) {
    currentUser {
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
      skills {
        id
        globalRate
        seniority
        skill {
          id
          name
        }
        reviews {
          id
          relationship
          description
          rate
          createdAt
          reviewer {
            id
            name
            surname
            avatar
            domain {
              name
              jobTitle
            }
          }
        }
      }
      followedUsers {
        id
        followed {
          id
          name
          surname
          avatar
          email
          domain {
            name
            jobTitle
          }
          location {
            country
            city
            address
          }
        }
      }
      notifications(limit: $limit, offset: $offset) {
        id
        seen
        text
        route
        createdAt
        dispatcher {
          id
          avatar
        }
      }
      answeredQuestions {
        id
        questionnaire {
          id
          title
          description
          questions {
            __typename
          }
          company {
            name
          }
          createdAt
        }
        candidate {
          id
        }
      }
      toBeSentQuestions {
        id
        email
        questionnaire {
          id
          title
          description
          questions {
            __typename
          }
          company {
            name
          }
          createdAt
        }
      }
      toBeAnsweredQuestions {
        id
        email
        questionnaire {
          id
          title
          description
          questions {
            __typename
          }
          company {
            name
          }
          createdAt
        }
        sender {
          id
        }
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query profile($getUserProfileUserId: ID!) {
    getUserProfile(userID: $getUserProfileUserId) {
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
      skills {
        id
        globalRate
        seniority
        skill {
          id
          name
        }
        reviews {
          id
          relationship
          description
          rate
          createdAt
          reviewer {
            id
            name
            surname
            avatar
            domain {
              name
              jobTitle
            }
          }
        }
      }
      followedUsers {
        id
        followed {
          id
          name
          surname
          avatar
          email
          domain {
            name
            jobTitle
          }
          location {
            country
            city
            address
          }
        }
      }
    }
  }
`;
