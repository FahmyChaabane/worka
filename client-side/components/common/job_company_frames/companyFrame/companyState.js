import Styles from "../job_company.module.scss";

const CompanyState = ({ companyState }) => {
  return (
    <>
      <p className={Styles.companyCard_details_menu_name}>State:</p>
      <ul className={Styles.companyCard_details_menu_list}>
        <li className={Styles.companyCard_details_menu_list_item}>
          {companyState}
        </li>
      </ul>
    </>
  );
};

export default CompanyState;
