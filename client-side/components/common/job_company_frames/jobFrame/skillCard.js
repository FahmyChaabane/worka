import { useRouter } from "next/router";
import Styles from "../job_company.module.scss";
import SkillItems from "./skillItems";

const SkillCard = ({ requiredSkills, setChecked, checked }) => {
  const router = useRouter();

  const requiredSkillsLength = requiredSkills.length;
  const userSkills = ["Databases", "Machine Learning", "UI design"];
  const commonData = requiredSkills.filter((skill) =>
    userSkills.includes(skill)
  );
  const unCommonData = requiredSkills.filter(
    (skill) => !userSkills.includes(skill)
  );
  let skills = [...commonData, ...unCommonData];

  return (
    <div className={Styles.skillCard}>
      <div className={Styles.skillCard_skillSections}>
        <span className={Styles.skillCard_skillSections_title}>
          Required skills:
        </span>
        <SkillItems
          skills={skills}
          commonData={commonData}
          requiredSkillsLength={requiredSkillsLength}
        />
      </div>
      <div className={Styles.skillCard_actions}>
        <span className={Styles.skillCard_actions_skillRate}>
          {commonData.length}/{requiredSkillsLength} skills checked -{" "}
        </span>
        <span
          className={Styles.skillCard_actions_apply}
          onClick={() => {
            setChecked(!checked);
            console.log("see job", checked);
          }}
        >
          {router.pathname.includes("applied")
            ? "See job description"
            : "You can apply"}
        </span>
      </div>
    </div>
  );
};

export default SkillCard;
