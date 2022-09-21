import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../lib/queries/user";
import Layout from "../layout/layout";
import Header from "../layout/header/header";
import QuestionItem from "../common/questionnaire/questionnaire";
import Loader from "../common/loader/loader";
import Styles from "./questionnaire.module.scss";

const AnswersCmp = () => {
  const {
    loading,
    data: { currentUser },
  } = useQuery(GET_CURRENT_USER, {
    onCompleted: () => {
      console.log("i am supposed to be coming from the cache");
    },
  });
  if (loading) return <Loader headed={true} />;

  console.log("data", currentUser.toBeAnsweredQuestions);

  // const data = [
  //   {
  //     companyName: "Heroku",
  //     logo: "/images/akat.jpg",
  //     jobTitle: "Backend Developer",
  //     questionnaireType: "Video",
  //     recordingTime: "25:00 minutes",
  //     answerTo: null,
  //     questionNumbers: 8,
  //     QuestionnaireDate: "25 Jan 2019",
  //     answered: false,
  //   },
  // ];

  return (
    <Layout>
      <Header>
        <div className={Styles.container}>
          {currentUser.toBeAnsweredQuestions.map((item, index) => (
            <QuestionItem key={index} quest={item} special="toanswer" />
          ))}
        </div>
      </Header>
    </Layout>
  );
};

export default AnswersCmp;
