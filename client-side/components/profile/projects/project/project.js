import Layout from "../../../layout/layout";
import Header from "../../../layout/header/header";
import Styles from "../projects.module.scss";
import { useRouter } from "next/router";

const Project = () => {
  const router = useRouter();
  const obj = router.query;
  console.log("diss", obj);

  return (
    <Layout>
      <Header>
        <section className={Styles.container}>
          Hi we are the school of rock
        </section>
      </Header>
    </Layout>
  );
};

export default Project;
