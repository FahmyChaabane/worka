import Styles from "./about.module.scss";
import Image from "next/image";

const EducationExperienceElement = ({ eduexp }) => {
  return (
    <div className={Styles.details_element}>
      <div className={Styles.details_element_left}>
        <div className={Styles.details_element_img_mgn}>
          <Image
            className={Styles.details_element_img}
            src="/images/schoolplaceholder.jpg"
            alt="eduexp"
            height={80}
            width={80}
          />
        </div>

        <div>
          <span className={Styles.details_element_key}>School</span>
          <h3 className={Styles.details_element_value}>{eduexp.schoolName}</h3>
        </div>
      </div>
      <div className={Styles.details_element_mid}>
        <span className={Styles.details_element_key}>Diploma</span>
        <h3 className={Styles.details_element_value}>{eduexp.degree}</h3>
      </div>
      <div className={Styles.details_element_right}>
        <span className={Styles.details_element_key}>Duration</span>
        <h3 className={Styles.details_element_value}>
          {" "}
          From {eduexp.from.month} {eduexp.from.year} to {eduexp.to.month}{" "}
          {eduexp.to.year}
        </h3>
      </div>
    </div>
  );
};

export default EducationExperienceElement;
