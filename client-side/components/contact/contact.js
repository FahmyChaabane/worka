import Layout from "../layout/layout";
import Styles from "./contact.module.scss";
import Header from "../layout/header/header";

const Contact = () => {
  return (
    <Layout>
      <Header>
        <div className={Styles.container}>contact us</div>
      </Header>
    </Layout>
  );
};

export default Contact;
