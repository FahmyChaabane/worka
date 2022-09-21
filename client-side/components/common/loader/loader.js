import Header from "../../layout/header/header";
import Layout from "../../layout/layout";
import Styles from "./loader.module.scss";

const Loader = ({ layouted, headed }) =>
  headed ? (
    <Layout>
      <Header>
        <div className={Styles.container} style={{ height: "20vh" }}>
          <div className={Styles.container_loader}></div>
          <div className={Styles.container_text}>Loading...</div>
        </div>
      </Header>
    </Layout>
  ) : layouted ? (
    <Layout>
      <div className={Styles.container} style={{ height: "30vh" }}>
        <div className={Styles.container_loader}></div>
        <div className={Styles.container_text}>Loading...</div>
      </div>
    </Layout>
  ) : (
    <div className={Styles.container}>
      <div className={Styles.container_loader}></div>
      <div className={Styles.container_text}>Loading...</div>
    </div>
  );
export default Loader;
