import _ from "lodash";
import Styles from "../steps.module.scss";

const BirthdayQuestions = ({ born, setBirthdayQuestions, error }) => {
  const handleChange = ({ currentTarget: input }) => {
    const birthday = { ...born };
    _.set(birthday, input.name, input.value);
    setBirthdayQuestions(birthday);
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
        <p className={Styles.headingmd}>When were you born?</p>
        <div className={Styles.layout_inside_questionsGrid_3}>
          <div>
            <select
              className={[
                Styles.layout_inside_selection,
                Styles.headingsm,
              ].join(" ")}
              onChange={handleChange}
              name="day"
              value={born.day}
            >
              <option value="" disabled>
                Day
              </option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
            {_.get(error, "day") && (
              <div className={Styles.layout_inside_questionsGrid_error}>
                {error.day}
              </div>
            )}
          </div>
          <div>
            <select
              className={[
                Styles.layout_inside_selection,
                Styles.headingsm,
              ].join(" ")}
              onChange={handleChange}
              name="month"
              value={born.month}
            >
              <option value="" disabled>
                Month
              </option>
              <option>January</option>
              <option>March</option>
              <option>April</option>
              <option>August</option>
            </select>

            {_.get(error, "month") && (
              <div className={Styles.layout_inside_questionsGrid_error}>
                {error.month}
              </div>
            )}
          </div>
          <div>
            <select
              className={[
                Styles.layout_inside_selection,
                Styles.headingsm,
              ].join(" ")}
              onChange={handleChange}
              name="year"
              value={born.year}
            >
              <option value="" disabled>
                Year
              </option>
              <option>2021</option>
              <option>2020</option>
              <option>2019</option>
              <option>2018</option>
            </select>
            {_.get(error, "year") && (
              <div className={Styles.layout_inside_questionsGrid_error}>
                {error.year}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayQuestions;
