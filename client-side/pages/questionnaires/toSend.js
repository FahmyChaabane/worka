import withAuthServerSideProps, { amICompleted } from "../../lib/withAuth";
import SendsCmp from "../../components/questionnaire/sends";

const ToSends = () => {
  return <SendsCmp />;
};

export default amICompleted(ToSends);
export const getServerSideProps = withAuthServerSideProps();
