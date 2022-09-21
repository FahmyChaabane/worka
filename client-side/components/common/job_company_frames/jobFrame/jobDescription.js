import Styles from "../job_company.module.scss";
import Button from "../../../button/Button";

const JobDescription = ({ job }) => {
  return (
    <div className={Styles.jobDescription}>
      <div className={Styles.jobDescription_details}>
        <h2 className={Styles.jobDescription_details_title}>Job Details</h2>
        <p className={Styles.jobDescription_details_text}>{job.jobDetails}</p>
      </div>
      <div className={Styles.jobDescription_details}>
        <h2 className={Styles.jobDescription_details_title}>
          Some of the things you will be doing include...
        </h2>
        <ul className={Styles.jobDescription_details_list}>
          {job.futureTasks.map((task, index) => (
            <li
              key={index}
              className={[
                Styles.jobDescription_details_list_item,
                Styles.jobDescription_details_text,
              ].join(" ")}
            >
              {task}
            </li>
          ))}
        </ul>
      </div>
      <div className={Styles.jobDescription_details}>
        <h2 className={Styles.jobDescription_details_title}>Who you are...</h2>
        <ul className={Styles.jobDescription_details_list}>
          {job.expectedProfile.map((adv, index) => (
            <li
              key={index}
              className={[
                Styles.jobDescription_details_list_item,
                Styles.jobDescription_details_text,
              ].join(" ")}
            >
              {adv}
            </li>
          ))}
        </ul>
      </div>
      <div className={Styles.jobDescription_details}>
        <h2 className={Styles.jobDescription_details_title}>
          Posting Statement
        </h2>
        <p className={Styles.jobDescription_details_text}>
          {job.postingStatement}
        </p>
      </div>
      <div className={Styles.jobDescription_details_action}>
        <div className={Styles.jobDescription_details_action_text}>
          <p>
            Posted {job.date} - {job.appliedPersons} person applied
          </p>
          <span>Report this job</span>
        </div>
        <Button text="Apply for this job" background="black" width="50%" />
      </div>
    </div>
  );
};

export default JobDescription;
