import withAuthServerSideProps, { amICompleted } from "../../lib/withAuth";
import Collegues from "../../components/find/collegues/collegues";

const collegues = () => {
  return <Collegues />;
};

export default amICompleted(collegues);
export const getServerSideProps = withAuthServerSideProps();
