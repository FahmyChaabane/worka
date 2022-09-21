import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../lib/queries/user";
import Layout from "../layout/layout";
import Header from "../layout/header/header";
import QuestionItem from "../common/questionnaire/questionnaire";
import Loader from "../common/loader/loader";
import Styles from "./questionnaire.module.scss";

const SendsCmp = () => {
  const {
    loading,
    data: { currentUser },
  } = useQuery(GET_CURRENT_USER, {
    onCompleted: () => {
      console.log("i am supposed to be coming from the cache");
    },
  });
  if (loading) return <Loader headed={true} />;

  console.log("data", currentUser.toBeSentQuestions);

  return (
    <Layout>
      <Header>
        <div className={Styles.container}>
          {currentUser.toBeSentQuestions.map((item, index) => (
            <QuestionItem key={index} quest={item} special="tosend" />
          ))}
        </div>
      </Header>
    </Layout>
  );
};

export default SendsCmp;
