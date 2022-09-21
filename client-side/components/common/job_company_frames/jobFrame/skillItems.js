import Styles from "../job_company.module.scss";

const SkillItems = ({ skills, commonData, requiredSkillsLength }) => {
  skills = skills.length > 4 ? skills.slice(0, 4) : skills;

  return (
    <ul className={Styles.skillCard_skillSections_items}>
      {skills.map((skill, index) => (
        <li key={index} className={Styles.skillCard_skillSections_items_item}>
          <span>{skill}</span>
          {commonData.includes(skill) && (
            <span
              className={
                Styles.skillCard_skillSections_items_item_checkContainer
              }
            >
              <svg
                className={
                  Styles.skillCard_skillSections_items_item_checkContainer_icon
                }
              >
                <use xlinkHref="/images/sprite.svg#icon-check"></use>
              </svg>
            </span>
          )}
        </li>
      ))}
      {requiredSkillsLength > 4 && (
        <li className={Styles.skillCard_skillSections_items_item}>
          <span>+{requiredSkillsLength - 4} other skills</span>
        </li>
      )}
    </ul>
  );
};

export default SkillItems;
