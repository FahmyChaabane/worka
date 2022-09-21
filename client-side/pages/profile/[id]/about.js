import withAuthServerSideProps, {
  amICompleted,
  withProfile,
} from "../../../lib/withAuth";
import About from "../../../components/profile/about/about";

const about = () => {
  return <About />;
};

export default amICompleted(withProfile(about));
export const getServerSideProps = withAuthServerSideProps((ctx) => {
  return ctx.params;
});
