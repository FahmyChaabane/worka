import withAuthServerSideProps, { amICompleted } from "../../lib/withAuth";
import AppliedJobs from "../../components/jobs/applied/applied";

const MainJobs = () => {
  return <AppliedJobs />;
};

export default amICompleted(MainJobs);
export const getServerSideProps = withAuthServerSideProps();
