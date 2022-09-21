import Styles from "../job_company.module.scss";
import CompanyCard from "./companyCard";

const CompanyFrame = ({ job }) => {
  return (
    <div className={Styles.frame}>
      <CompanyCard job={job} />
    </div>
  );
};

export default CompanyFrame;
