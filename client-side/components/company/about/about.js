import Header from "../../layout/header/header";
import Layout from "../../layout/layout";
import Styles from "./about.module.scss";
import BasicFirstlyInformations from "./basicFirstlyInformations";
import BasicSecondlyInformations from "./basicSecondlyInformations";
import Description from "./desciption";

const About = () => {
  return (
    <Layout>
      <Header>
        <section className={Styles.container}>
          <BasicFirstlyInformations />
          <BasicSecondlyInformations />
          <div className={Styles.details}>
            <p className={Styles.details_title}>Description:</p>
            <Description />
          </div>
        </section>
      </Header>
    </Layout>
  );
};

export default About;
