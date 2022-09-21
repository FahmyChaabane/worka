import withAuthServerSideProps, { amICompleted } from "../../lib/withAuth";
import AnswersCmp from "../../components/questionnaire/answers";

const ToAnswer = () => {
  return <AnswersCmp />;
};

export default amICompleted(ToAnswer);
export const getServerSideProps = withAuthServerSideProps();
