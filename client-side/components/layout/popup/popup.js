import Styles from "./popup.module.scss";

const Popup = ({ children, footerText }) => {
  return (
    <section className={Styles.background}>
      <main className={Styles.container}>{children}</main>
      <div className={Styles.container_footer}>{footerText}</div>
    </section>
  );
};

export default Popup;
