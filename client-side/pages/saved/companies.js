import withAuthServerSideProps, { amICompleted } from "../../lib/withAuth";
import SavedCompanies from "../../components/saved/companies/companies";

const savedCompanies = () => {
  return <SavedCompanies />;
};

export default amICompleted(savedCompanies);
export const getServerSideProps = withAuthServerSideProps();
