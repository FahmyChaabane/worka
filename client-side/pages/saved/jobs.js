import withAuthServerSideProps, { amICompleted } from "../../lib/withAuth";
import SavedJobs from "../../components/saved/jobs/jobs";

const savedJobs = () => {
  return <SavedJobs />;
};

export default amICompleted(savedJobs);
export const getServerSideProps = withAuthServerSideProps();
