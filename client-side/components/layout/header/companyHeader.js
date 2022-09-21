import Styles from "./header.module.scss";
import Image from "next/image";

const CompanyHeader = () => {
  return (
    <>
      <div className={Styles.container_header_user_photo}>
        <Image
          height={70}
          width={70}
          src="/images/heroku.jpg"
          alt="company"
          className={Styles.container_header_user_photo}
        />
      </div>
      <div className={Styles.container_header_user_title}>
        <h2 className={Styles.container_header_user_title_name}>Heroku</h2>
        <span className={Styles.container_header_user_title_desc}>
          wholesalers and retailers working in partnership to the benefit of
          all.
        </span>
      </div>
    </>
  );
};

export default CompanyHeader;
