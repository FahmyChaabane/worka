import withAuthServerSideProps, { amICompleted } from "../../lib/withAuth";
import AnsweredCmp from "../../components/questionnaire/answered";

const Answered = () => {
  return <AnsweredCmp />;
};

export default amICompleted(Answered);
export const getServerSideProps = withAuthServerSideProps();
