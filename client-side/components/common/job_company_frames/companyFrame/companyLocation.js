import Styles from "../job_company.module.scss";

const CompanyLocation = ({ companyLocations }) => {
  return (
    <>
      <p className={Styles.companyCard_details_menu_name}>Location:</p>
      <ul className={Styles.companyCard_details_menu_list}>
        {companyLocations.map((type, index) => (
          <li key={index} className={Styles.companyCard_details_menu_list_item}>
            {type}
          </li>
        ))}
      </ul>
    </>
  );
};

export default CompanyLocation;
