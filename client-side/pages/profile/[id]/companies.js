import withAuthServerSideProps, {
  amICompleted,
  withProfile,
} from "../../../lib/withAuth";
import Companies from "../../../components/profile/companies/companies";

const companies = () => {
  return <Companies />;
};

export default amICompleted(withProfile(companies));
export const getServerSideProps = withAuthServerSideProps((ctx) => {
  return ctx.params;
});
