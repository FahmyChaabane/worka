import Styles from "../job_company.module.scss";
import { useState } from "react";

import JobCard from "./jobCard";
import SkillCard from "./skillCard";
import JobDescription from "./jobDescription";

const JobFrame = ({ job }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className={Styles.frame}>
      <JobCard job={job} checked={checked} setChecked={setChecked} />

      <SkillCard
        requiredSkills={job.requiredSkills}
        checked={checked}
        setChecked={setChecked}
      />

      {checked && <JobDescription job={job} />}
    </div>
  );
};

export default JobFrame;
