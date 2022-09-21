import { gql } from "@apollo/client";

export const FOLLOW_USER = gql`
  mutation FOLLOW_USER($followUserProfileId: ID!) {
    followUser(profileID: $followUserProfileId) {
      id
      followed {
        id
        # name // fragments ??
        # surname
        # avatar
        # email
        # domain {
        #   name
        #   jobTitle
        # }
        # location {
        #   country
        #   city
        #   address
        # }
      }
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation UNFOLLOW_USER($unfollowUserProfileId: ID!) {
    unfollowUser(profileID: $unfollowUserProfileId) {
      id
    }
  }
`;

export const EDIT_USER_ACCOUNT = gql`
  mutation ($editUserAccountDataData: accountEditedDataContent!) {
    editUserAccountData(data: $editUserAccountDataData) {
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
      bio
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
      notifications {
        id
        seen
        text
        route
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

export const SEND_REVIEW_INVITATIONS = gql`
  mutation ($sendReviewInvitationsEmailsData: EmailsContent!) {
    sendReviewInvitationsEmails(data: $sendReviewInvitationsEmailsData)
  }
`;

export const SUBMIT_REVIEW = gql`
  mutation ($addReviewData: ReviewContent!) {
    addReview(data: $addReviewData) {
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
  }
`;

export const SUBMIT_SEE_NOIFICATION = gql`
  mutation ($markAsSeenNotificationNotificationId: ID!) {
    markAsSeenNotification(
      notificationID: $markAsSeenNotificationNotificationId
    ) {
      id
      seen
    }
  }
`;

export const SEND_QUESTIONNAIRE_INVITATIONS = gql`
  mutation ($emails: [String]!, $questionnaireId: ID!) {
    sendTextQuestionnaireToManager(
      emails: $emails
      questionnaireID: $questionnaireId
    )
  }
`;

export const SUBMIT_TEXT_SUBMISSION = gql`
  mutation ($submitTextQuestionnaireData: TextQuestionnaireSubmissionInput!) {
    submitTextQuestionnaire(data: $submitTextQuestionnaireData) {
      id
      user {
        id
        email
      }
      questionnaire {
        id
      }
      candidate {
        id
      }
    }
  }
`;
