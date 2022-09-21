import withAuthServerSideProps, { amICompleted } from "../../lib/withAuth";
import Review from "../../components/review/review";

const Reviews = () => {
  return <Review />;
};

export default amICompleted(Reviews);
export const getServerSideProps = withAuthServerSideProps();
