import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../../lib/queries/user";
import { GET_TEXT_QUESTIONNAIRE_SUBMISSION } from "../../lib/queries/questionnaire";
import Layout from "../layout/layout";
import Divide from "../layout/common/divide";
import Infos from "../common/review_questionnaire/infos";
import Loader from "../common/loader/loader";
import QuestionItem from "./questionnaireForm/questionItem";
import Styles from "./questionnaire.module.scss";

const Questionnaire = () => {
  const router = useRouter();
  const { id: idQ, userID } = router.query;
  console.log("userID", userID);

  const {
    data: questionnaireData,
    loading: loadQuestionnaire,
    error: errQuestionnaire,
  } = useQuery(GET_TEXT_QUESTIONNAIRE_SUBMISSION, {
    variables: { questionnaireSubmissionId: idQ },
    onCompleted: () => {
      console.log("questionnaire data has come FROM QUESTIONNAIRE PAGE!");
    },
  });

  const [
    userQuery,
    { called, loading: loadUser, data: profileUser, error: errUser },
  ] = useLazyQuery(GET_USER_PROFILE, {
    variables: { getUserProfileUserId: userID },
  });

  useEffect(() => {
    if (userID) userQuery();
  }, []);

  // const {
  //   data: profileUser,
  //   loading: loadUser,
  //   // error: errUser,
  // } = useQuery(GET_USER_PROFILE, {
  //   variables: { getUserProfileUserId: userID },
  //   onCompleted: () => {
  //     console.log("profile data has come FROM QUESTIONNAIRE PAGE!");
  //   },
  // });

  if (
    errQuestionnaire ||
    loadQuestionnaire ||
    !questionnaireData?.getTextQuestionnaireSubmissionsByID
  ) {
    return <Loader layouted={true} />;
  }

  if (userID) {
    if (errUser || (called && loadUser) || !profileUser?.getUserProfile) {
      return <Loader layouted={true} />;
    }
  }

  const componentInfoHeader = {
    img: "/images/questionnaire.png",
    title: "Answer Questionnaire",
    text: "questionnaire",
  };

  const companyData = {
    id: questionnaireData.getTextQuestionnaireSubmissionsByID.questionnaire
      .company.id,
    name: questionnaireData.getTextQuestionnaireSubmissionsByID.questionnaire
      .company.name,
    avatar:
      questionnaireData.getTextQuestionnaireSubmissionsByID.questionnaire
        .company.avatar,
  };

  const userData = {
    ...(profileUser && {
      id: profileUser.getUserProfile.id,
      name: profileUser.getUserProfile.name,
      surname: profileUser.getUserProfile.surname,
      avatar: profileUser.getUserProfile.avatar,
      job: profileUser.getUserProfile.domain.jobTitle,
    }),
  };

  const questions =
    questionnaireData.getTextQuestionnaireSubmissionsByID.response;

  console.log("what?", questions);

  return (
    <Layout>
      <Divide>
        <Infos
          info={componentInfoHeader}
          userData={userData}
          companyData={companyData}
        />

        <QuestionForm questions={questions} idQ={idQ} userID={userID} />
      </Divide>
    </Layout>
  );
};

export default Questionnaire;

const QuestionForm = ({ questions }) => {
  return (
    <div className={Styles.container}>
      {questions.map((q, index) => (
        <QuestionItem
          key={index}
          questionIndex={index}
          questionItem={q}
          isManager={true}
        />
      ))}
    </div>
  );
};
