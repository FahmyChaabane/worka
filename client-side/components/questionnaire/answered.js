import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../lib/queries/user";
import Layout from "../layout/layout";
import Header from "../layout/header/header";
import QuestionItem from "../common/questionnaire/questionnaire";
import Loader from "../common/loader/loader";
import Styles from "./questionnaire.module.scss";

const AnsweredCmp = () => {

  const { loading, data: {currentUser} } = useQuery(GET_CURRENT_USER, {
    onCompleted: () => {
      console.log("i am supposed to be coming from the cache");
    },
  });
  if (loading) return <Loader headed={true} />;

  console.log("data", currentUser.answeredQuestions);

  return (
    <Layout>
      <Header>
        <div className={Styles.container}>
          {currentUser.answeredQuestions.map((item, index) => (
            <QuestionItem key={index} quest={item} special="answered" />
          ))}
        </div>
      </Header>
    </Layout>
  );
};

export default AnsweredCmp;
