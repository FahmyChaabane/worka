import Styles from "../job_company.module.scss";

const CompanyEmployeesNumber = ({ numberEmployees }) => {
  return (
    <>
      <p className={Styles.companyCard_details_menu_name}>
        Number of employees:
      </p>
      <ul className={Styles.companyCard_details_menu_list}>
        <li className={Styles.companyCard_details_menu_list_item}>
          {numberEmployees}
        </li>
      </ul>
    </>
  );
};

export default CompanyEmployeesNumber;
