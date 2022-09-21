import withAuthServerSideProps, { amICompleted } from "../../../lib/withAuth";
import Questionnaire from "../../../components/questionnaire/submittedQuestionnaire";

const QuestionnaireItem = () => {
  return <Questionnaire />;
};

export default amICompleted(QuestionnaireItem);
export const getServerSideProps = withAuthServerSideProps();
