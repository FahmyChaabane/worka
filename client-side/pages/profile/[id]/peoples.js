import withAuthServerSideProps, {
  amICompleted,
  withProfile,
} from "../../../lib/withAuth";
import Peoples from "../../../components/profile/peoples/peoples";

const peoples = () => {
  return <Peoples />;
};

export default amICompleted(withProfile(peoples));
export const getServerSideProps = withAuthServerSideProps((ctx) => {
  return ctx.params;
});
