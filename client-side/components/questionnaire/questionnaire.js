import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../../lib/queries/user";
import { GET_TEXT_QUESTIONNAIRE } from "../../lib/queries/questionnaire";
import Layout from "../layout/layout";
import Divide from "../layout/common/divide";
import Infos from "../common/review_questionnaire/infos";
import QuestionForm from "./questionnaireForm/questionForm";
import Loader from "../common/loader/loader";

const Questionnaire = () => {
  const router = useRouter();
  const { id: idQ, userID } = router.query;
  console.log("userID", userID);

  const {
    data: questionnaireData,
    loading: loadQuestionnaire,
    error: errQuestionnaire,
  } = useQuery(GET_TEXT_QUESTIONNAIRE, {
    variables: { textQuestionnaireId: idQ },
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
    !questionnaireData?.getQuestionnaireByID
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
    id: questionnaireData.getQuestionnaireByID.company.id,
    name: questionnaireData.getQuestionnaireByID.company.name,
    avatar: questionnaireData.getQuestionnaireByID.company.avatar,
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

  const questions = questionnaireData.getQuestionnaireByID.questions;

  return (
    <Layout>
      <Divide>
        <Infos
          info={componentInfoHeader}
          userData={userData}
          companyData={companyData}
        />

        <QuestionForm
          questions={questions}
          idQ={idQ}
          userID={userID}
          isManager={
            questionnaireData.getQuestionnaireByID.receiver === "MANAGER" &&
            !!!userID
          }
        />
      </Divide>
    </Layout>
  );
};

export default Questionnaire;
