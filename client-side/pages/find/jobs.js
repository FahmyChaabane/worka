import withAuthServerSideProps, { amICompleted } from "../../lib/withAuth";
import Jobs from "../../components/find/jobs/jobs";

const jobs = () => {
  return <Jobs />;
};

export default amICompleted(jobs);
export const getServerSideProps = withAuthServerSideProps();
