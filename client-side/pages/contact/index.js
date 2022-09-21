import withAuthServerSideProps, { amICompleted } from "../../lib/withAuth";
import Contact from "../../components/contact/contact";

const contact = () => {
  return <Contact />;
};

export default amICompleted(contact);
export const getServerSideProps = withAuthServerSideProps();
