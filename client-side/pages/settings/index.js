import withAuthServerSideProps, { amICompleted } from "../../lib/withAuth";
import Settings from "../../components/settings/settings";

const settings = () => {
  return <Settings />;
};

export default amICompleted(settings);
export const getServerSideProps = withAuthServerSideProps();
