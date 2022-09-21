import Styles from "../job_company.module.scss";

const JobSeniorityLevel = ({ seniorityLevel }) => {
  return (
    <div className={Styles.jobCard_details_menu}>
      <p className={Styles.jobCard_details_menu_name}>Seniority level:</p>
      <ul className={Styles.jobCard_details_menu_list}>
        {seniorityLevel.map((level, index) => (
          <li key={index} className={Styles.jobCard_details_menu_list_item}>
            {level}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobSeniorityLevel;
