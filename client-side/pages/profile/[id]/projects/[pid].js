import withAuthServerSideProps, {
  amICompleted,
} from "../../../../lib/withAuth";
import ProjectItem from "../../../../components/profile/projects/project/project";

const Project = () => {
  return <ProjectItem />;
};

export default amICompleted(Project);
export const getServerSideProps = withAuthServerSideProps();
