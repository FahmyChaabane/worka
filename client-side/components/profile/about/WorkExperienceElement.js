import Styles from "./about.module.scss";
import Image from "next/image";

const WorkExperienceElement = ({ workexp }) => {
  return (
    <div className={Styles.details_element}>
      <div className={Styles.details_element_left}>
        <div className={Styles.details_element_img_mgn}>
          <Image
            className={Styles.details_element_img}
            src="/images/companyplaceholder.png"
            alt="workexp"
            height={80}
            width={80}
          />
        </div>
        <div>
          <span className={Styles.details_element_key}>Company</span>
          <h3 className={Styles.details_element_value}>
            {workexp.companyName}
          </h3>
        </div>
      </div>
      <div className={Styles.details_element_mid}>
        <span className={Styles.details_element_key}>Job Title</span>
        <h3 className={Styles.details_element_value}>{workexp.post}</h3>
      </div>
      <div className={Styles.details_element_right}>
        <span className={Styles.details_element_key}>Duration</span>
        <h3 className={Styles.details_element_value}>
          From {workexp.from.month} {workexp.from.year} to {workexp.to.month}{" "}
          {workexp.to.year}
        </h3>
      </div>
    </div>
  );
};

export default WorkExperienceElement;
