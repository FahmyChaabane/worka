import { useContext, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  SEND_QUESTIONNAIRE_INVITATIONS,
  SUBMIT_TEXT_SUBMISSION,
} from "../../../lib/mutations/userActions";
import { NotificationContext } from "../../../pages/_app";
import { UserContext } from "../../providers/userProvider";
import { validateV } from "../../../lib/inputsValidation";
import Button from "../../button/Button";
import LastStep from "../../common/review_questionnaire/lastStep";
import QuestionItem from "./questionItem";
import handlingError from "../../../lib/handlingError";
import AskInvitationPopup from "../../common/popupInvitations/askInvitationPopup";
import Joi from "joi";
import Styles from "../questionnaire.module.scss";

const QuestionForm = ({ questions, idQ, userID, isManager }) => {
  // console.log("IS MANAGER", isManager);
  const [finish, setFinish] = useState(false);
  const [error, setError] = useState([]);
  const [responses, setResponses] = useState([]);
  const [showAskSkillReview, setShowAskSkillReview] = useState(false);

  const { setNotifyError, setNotifySuccess } = useContext(NotificationContext);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const responses = questions.map((questionItem) => {
      return {
        type: questionItem.type,
        question: questionItem.question,
        response: "",
        choices: questionItem.choices.map((choice) => {
          return {
            choiceQuestion: choice.choiceQuestion,
          };
        }),
      };
    });
    setResponses(responses);
  }, [questions]);

  const [submitTextQuestionnaireMutation] = useMutation(
    SUBMIT_TEXT_SUBMISSION,
    {
      update: (cache, { data: { submitTextQuestionnaire } }) => {
        console.log("ahayyya");
        cache.modify({
          id: cache.identify(currentUser),
          fields: {
            answeredQuestions(existingAnswereds = []) {
              const newAnswered = cache.writeQuery({
                id: cache.identify(submitTextQuestionnaire),
                query: gql`
                  query TextQuestionnaireSubmission {
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
                `,
                data: submitTextQuestionnaire,
              });
              console.log("ahayyya", submitTextQuestionnaire);
              return [newAnswered, ...existingAnswereds];
            },
            toBeAnsweredQuestions(existingToBeAnswereds = [], { readField }) {
              return existingToBeAnswereds.filter((toBeAnswered) => {
                console.log("come onnn :", readField("sender", toBeAnswered));
                console.log(
                  "log1 : ",
                  readField("id", readField("questionnaire", toBeAnswered)),
                  "  ==  ",
                  submitTextQuestionnaire.questionnaire.id
                );

                console.log(
                  "log2 : ",
                  readField("email", toBeAnswered),
                  "  ==  ",
                  submitTextQuestionnaire.user.email
                );

                // console.log(
                //   "log3 : ",
                //   readField("id", readField("sender", toBeAnswered)),
                //   "  ==  ",
                //   submitTextQuestionnaire.candidate.id
                // );
                if (readField("sender", toBeAnswered) != null) {
                  return (
                    readField(
                      "id",
                      readField("questionnaire", toBeAnswered)
                    ) !== submitTextQuestionnaire.questionnaire.id || // check
                    readField("email", toBeAnswered) !==
                      submitTextQuestionnaire.user.email || // check
                    readField("id", readField("sender", toBeAnswered)) !==
                      submitTextQuestionnaire.candidate.id // check
                  );
                }
                return (
                  readField("id", readField("questionnaire", toBeAnswered)) !==
                    submitTextQuestionnaire.questionnaire.id || // check
                  readField("email", toBeAnswered) !==
                    submitTextQuestionnaire.user.email // check
                );
              });
            },
          },
        });
        cache.gc();
      },
      onCompleted: () => {
        console.log("FINISH!");
        setNotifySuccess({ show: true, msg: "TEXT QUEST submited!" });
        setFinish(!finish);
      },
      onError: (error) => {
        handlingError(error, setNotifyError);
      },
    }
  );

  const [sendQuestionnaireInvitationsMutation] = useMutation(
    SEND_QUESTIONNAIRE_INVITATIONS,
    {
      onCompleted: () => {
        console.log("FINISH!");
        setNotifySuccess({ show: true, msg: "emails sent!" });
      },
      onError: (error) => {
        handlingError(error, setNotifyError);
      },
    }
  );

  const sendInvitations = (emails) => {
    sendQuestionnaireInvitationsMutation({
      variables: {
        emails,
        questionnaireId: idQ,
      },
    });
  };

  const updateResponse = (data, indexQ, typeMULT, checked) => {
    const responsesClone = [...responses];
    if (typeMULT) {
      if (checked) {
        if (!responsesClone[indexQ].response)
          responsesClone[indexQ].response = data;
        else
          responsesClone[indexQ].response = [
            responsesClone[indexQ].response,
            data,
          ].join(";;");
      } else {
        const optionsArr = responsesClone[indexQ].response.split(";;");
        optionsArr.splice(optionsArr.indexOf(data), 1);
        responsesClone[indexQ].response = optionsArr.join(";;");
      }
    } else responsesClone[indexQ].response = data;

    setResponses(responsesClone);
  };

  const joiItemsSchema = Joi.object().keys({
    response: Joi.string().required().messages({
      "string.empty": "question is not allowed to be empty!",
    }),
    type: Joi.string().optional(),
    question: Joi.string().optional(),
    choices: Joi.array().optional(),
  });

  const sendQ = async () => {
    const errors = await validateV(joiItemsSchema, responses);
    setError(errors || []);
    if (errors.length !== 0) {
      // console.log("errors", errors);
      return;
    }

    submitTextQuestionnaireMutation({
      variables: {
        submitTextQuestionnaireData: {
          questionnaire: idQ,
          response: responses,
          ...(!!userID && { userID }),
        },
      },
    });
  };

  // console.log("YOU CAN TRY AGAAAAAIINNNNN", responses);

  return finish ? (
    <LastStep />
  ) : (
    <div className={Styles.container}>
      {responses.map((q, index) => (
        <QuestionItem
          key={index}
          questionIndex={index}
          questionItem={q}
          updateResponse={updateResponse}
          error={error[index]?.response}
          isManager={isManager}
        />
      ))}

      {isManager ? (
        <Button
          onClick={() => setShowAskSkillReview(true)}
          text="Send Questionnaire to my managers"
          color="white"
          background="#0980c6"
        />
      ) : (
        <Button
          onClick={sendQ}
          text="Finish"
          color="white"
          background="black"
        />
      )}
      {showAskSkillReview && (
        <AskInvitationPopup
          sendInvitations={sendInvitations}
          setShow={setShowAskSkillReview}
        />
      )}
    </div>
  );
};

export default QuestionForm;
