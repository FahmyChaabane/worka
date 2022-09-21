import withAuthServerSideProps, {
  amICompleted,
} from "../../../../../lib/withAuth";
import CreateProject from "../../../../../components/profile/projects/project/createProject";

const Create = () => {
  return <CreateProject />;
};

export default amICompleted(Create);
export const getServerSideProps = withAuthServerSideProps();
