import Styles from "./header.module.scss";

const ContactHeader = () => {
  return (
    <div className={Styles.contactHeader}>
      <p className={Styles.contactHeader_title}>Contact Us</p>
      <p className={Styles.contactHeader_paragraph}>
        Please drop a message below and we will get in touch with you shortly,
        do not forget to check your email.!
      </p>
    </div>
  );
};

export default ContactHeader;
