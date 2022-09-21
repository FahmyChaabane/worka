import Styles from "../job_company.module.scss";

const CompanyReviews = ({ reviews }) => {
  return (
    <>
      <p className={Styles.companyCard_details_menu_name}>Reviews:</p>
      <ul className={Styles.companyCard_details_menu_list}>
        <li className={Styles.companyCard_details_menu_list_item}>{reviews}</li>
      </ul>
    </>
  );
};

export default CompanyReviews;
