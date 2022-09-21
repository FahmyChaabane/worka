import Styles from "../job_company.module.scss";

const JobContractType = ({ contractType }) => {
  return (
    <div className={Styles.jobCard_details_menu}>
      <p className={Styles.jobCard_details_menu_name}>Type of contract:</p>
      <ul className={Styles.jobCard_details_menu_list}>
        {contractType.map((type, index) => (
          <li key={index} className={Styles.jobCard_details_menu_list_item}>
            {type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobContractType;
