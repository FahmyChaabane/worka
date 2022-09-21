import Styles from "../job_company.module.scss";

const JobSchedule = ({ schedule }) => {
  return (
    <div className={Styles.jobCard_details_menu}>
      <p className={Styles.jobCard_details_menu_name}>Schedule:</p>
      <ul className={Styles.jobCard_details_menu_list}>
        {schedule.map((timing, index) => (
          <li key={index} className={Styles.jobCard_details_menu_list_item}>
            {timing}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobSchedule;
