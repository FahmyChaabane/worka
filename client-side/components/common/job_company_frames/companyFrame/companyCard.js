import Styles from "../job_company.module.scss";
import CompanyEmployeesNumber from "./companyEmployeesNumber";
import CompanyLocation from "./companyLocation";
import CompanyReviews from "./companyReviews";
import CompanyState from "./companyState";
import Image from "next/image";

const CompanyCard = ({ job }) => {
  return (
    <div className={Styles.companyCard}>
      <div className={Styles.companyCard_header}>
        <div className={Styles.companyCard_header_company}>
          <div className={Styles.companyCard_header_company_logo_mgn}>
            <Image
              src={job.companyImg}
              alt="company"
              className={Styles.companyCard_header_company_logo}
              height={50}
              width={50}
            />
          </div>
          <div>
            <p className={Styles.companyCard_header_company_title}>
              {job.company}
            </p>
          </div>
        </div>
        <div className={Styles.companyCard_header_actions}>
          <div
            className={[
              Styles.companyCard_header_actions_btn,
              Styles.companyCard_header_actions_btn_visitbtn,
            ].join(" ")}
          >
            Visit profile
          </div>
          <svg className={Styles.companyCard_header_actions_icon}>
            <use href="/images/sprite.svg#icon-bookmark"></use>
          </svg>
        </div>
      </div>
      <div className={Styles.companyCard_title}>
        <p className={Styles.companyCard_title_text}>{job.companyService}</p>
      </div>
      <div className={Styles.companyCard_details}>
        <div className={Styles.companyCard_details_menu}>
          <CompanyLocation companyLocations={job.companyLocations} />
        </div>
        <div className={Styles.companyCard_details_menu}>
          <CompanyState companyState={job.companyState} />
        </div>
        <div className={Styles.companyCard_details_menu}>
          <CompanyEmployeesNumber numberEmployees={job.numberEmployees} />
        </div>
        <div className={Styles.companyCard_details_menu}>
          <CompanyReviews reviews={job.reviews} />
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
