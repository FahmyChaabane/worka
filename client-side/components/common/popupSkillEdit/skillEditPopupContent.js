import { getPeriod } from "../../../lib/utils";
import Image from "next/image";
import Styles from "./popupSkillEdit.module.scss";

const SkillEditPopupContent = ({
  skill,
  period,
  incrementPeriod,
  decrementPeriod,
}) => {
  return (
    <div className={Styles.popupContent_V}>
      <div className={Styles.popupContent_V_left}>
        <div className={Styles.popupContent_V_left_img_mgn}>
          <Image
            src="/images/skillplaceholder.png"
            alt="skill"
            className={Styles.popupContent_V_left_img}
            width={60}
            height={60}
          />
        </div>
        <div>
          <h3 className={Styles.popupHeader_title}>Skill:</h3>
          <p className={Styles.popupHeader_text}>{skill}</p>
        </div>
      </div>
      <div className={Styles.popupContent_V_right}>
        <div>
          <h3 className={Styles.popupHeader_title}>Experience:</h3>
          <p className={Styles.popupHeader_text}>
            {period ? getPeriod(period) : "0 months"}
          </p>
        </div>
        <div className={Styles.popupContent_V_right_counter}>
          <div
            className={Styles.popupContent_V_right_counter_circle}
            onClick={incrementPeriod}
          >
            <span
              className={Styles.popupContent_V_right_counter_circle_icon_V}
            ></span>
          </div>
          <div
            className={Styles.popupContent_V_right_counter_circle}
            onClick={decrementPeriod}
          >
            <span
              className={Styles.popupContent_V_right_counter_circle_icon}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillEditPopupContent;
