import withAuthServerSideProps, {
  amICompleted,
  withProfile,
} from "../../../../lib/withAuth";
import Projects from "../../../../components/profile/projects/projects";

const projects = () => {
  return <Projects />;
};

export default amICompleted(withProfile(projects));
export const getServerSideProps = withAuthServerSideProps((ctx) => {
  return ctx.params;
});
