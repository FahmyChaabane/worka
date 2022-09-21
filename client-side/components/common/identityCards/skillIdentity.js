import Image from "next/image";
import Styles from "./card.module.scss";

const SkillIdentity = ({ skillData }) => {
  return (
    <div className={Styles.frame}>
      <div className={Styles.frame_img_mgn}>
        <Image
          src="/images/skillplaceholder.png"
          alt="skill"
          className={Styles.frame_img}
          height={80}
          width={80}
        />
      </div>
      <div>
        <p className={Styles.frame_secondtitle}>Skill:</p>
        <h4 className={Styles.frame_title}>{skillData.name}</h4>
      </div>
    </div>
  );
};

export default SkillIdentity;
