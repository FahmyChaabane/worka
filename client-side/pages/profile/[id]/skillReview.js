import withAuthServerSideProps, {
  amICompleted,
  withProfile,
} from "../../../lib/withAuth";
import SkillReview from "../../../components/profile/skillReview/skillReview";

const profile = () => {
  return <SkillReview />;
};

export default amICompleted(withProfile(profile));
export const getServerSideProps = withAuthServerSideProps((ctx) => {
  return ctx.params;
});
