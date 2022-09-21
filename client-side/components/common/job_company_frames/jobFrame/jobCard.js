import JobButtons from "./jobButtons";
import JobContractType from "./jobContractType";
import JobSalaryRange from "./jobSalaryRange";
import JobSchedule from "./jobSchedule";
import JobSeniorityLevel from "./jobSeniorityLevel";
import JobWorkLocation from "./jobWorkLocation";
import Styles from "../job_company.module.scss";
import Image from "next/image";

const JobCard = ({ job, setChecked, checked }) => {
  const menu = [
    { id: "1", component: <JobContractType contractType={job.contractType} /> },
    {
      id: "2",
      component: <JobSeniorityLevel seniorityLevel={job.seniorityLevel} />,
    },
    { id: "3", component: <JobSchedule schedule={job.schedule} /> },
    { id: "4", component: <JobSalaryRange salaryRange={job.salaryRange} /> },
    { id: "5", component: <JobWorkLocation workLocation={job.workLocation} /> },
  ];

  return (
    <div className={Styles.jobCard}>
      <div className={Styles.jobCard_header}>
        <div className={Styles.jobCard_header_company}>
          <div className={Styles.jobCard_header_company_logo_mgn}>
            <Image
              src={job.companyImg}
              alt="company"
              className={Styles.jobCard_header_company_logo}
              height={50}
              width={50}
            />
          </div>
          <div>
            <p className={Styles.jobCard_header_company_name}>{job.company}</p>
            <p className={Styles.jobCard_header_company_location}>
              {job.location}
            </p>
          </div>
        </div>
        <div className={Styles.jobCard_header_actions}>
          <JobButtons checked={checked} setChecked={setChecked} />
          <div>
            <svg className={Styles.jobCard_header_actions_icon}>
              <use href="/images/sprite.svg#icon-bookmark"></use>
            </svg>
          </div>
        </div>
      </div>
      <div className={Styles.jobCard_title}>
        <p className={Styles.jobCard_title_text}>{job.postTitle}</p>
        {job.isRemote && (
          <span className={Styles.jobCard_title_option}>REMOTE</span>
        )}
      </div>
      <div className={Styles.jobCard_details}>
        {menu.map((item) => (
          <div key={item.id}>{item.component}</div>
        ))}
      </div>
    </div>
  );
};

export default JobCard;
