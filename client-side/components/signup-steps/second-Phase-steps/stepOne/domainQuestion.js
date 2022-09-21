import _ from "lodash";
import Input from "../../../input/InputText";
import Styles from "../steps.module.scss";

const DomainQuestions = ({ domain, setDomainQuestions, error }) => {
  const handleChange = ({ currentTarget: input }) => {
    const domainObj = { ...domain };
    _.set(domainObj, input.name, input.value);
    setDomainQuestions(domainObj);
  };

  return (
    <div
      className={[
        Styles.layout,
        error ? Styles.layout_invalidborder : Styles.layout_validborder,
      ].join(" ")}
    >
      <div className={Styles.layout_inside}>
        <p className={Styles.headingsm}>Question:</p>
        <p className={Styles.headingmd}>What is your domain?</p>
        <div className={Styles.layout_inside_questionsGrid_1}>
          <div>
            <select
              className={[
                Styles.layout_inside_selection,
                Styles.headingsm,
              ].join(" ")}
              onChange={handleChange}
              name="name"
              value={domain.name}
            >
              <option value="" disabled>
                Select Domain
              </option>
              <option>Desgin</option>
              <option>IT</option>
              <option>Sociology</option>
              <option>Networks</option>
            </select>

            {_.get(error, "name") && (
              <div className={Styles.layout_inside_questionsGrid_error}>
                {error.name}
              </div>
            )}
          </div>

          <div>
            <Input
              placeholder="Write your job title here."
              style={{ background: "white" }}
              onChange={handleChange}
              value={domain.jobTitle}
              name="jobTitle"
            />
            {_.get(error, "jobTitle") && (
              <div className={Styles.layout_inside_questionsGrid_error}>
                {error.jobTitle}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainQuestions;
