import Styles from "../job_company.module.scss";

const JobSalaryRange = ({ salaryRange }) => {
  return (
    <div className={Styles.jobCard_details_menu}>
      <p className={Styles.jobCard_details_menu_name}>Salary of range:</p>
      <ul className={Styles.jobCard_details_menu_list}>
        {salaryRange.map((salary, index) => (
          <li key={index} className={Styles.jobCard_details_menu_list_item}>
            {salary}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobSalaryRange;
