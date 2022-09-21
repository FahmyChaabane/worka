import Styles from "../job_company.module.scss";

const JobWorkLocation = ({ workLocation }) => {
  return (
    <div className={Styles.jobCard_details_menu}>
      <p className={Styles.jobCard_details_menu_name}>Work location:</p>
      <ul className={Styles.jobCard_details_menu_list}>
        {workLocation.map((location, index) => (
          <li key={index} className={Styles.jobCard_details_menu_list_item}>
            {location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobWorkLocation;
