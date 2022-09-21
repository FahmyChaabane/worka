import RadioBox from "../../../input/radiobox";
import Styles from "../steps.module.scss";

const GenderQuestions = ({ gender, setGenderQuestions, error }) => {
  const handleChange = ({ target }) => {
    setGenderQuestions(target.value);
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
        <p className={Styles.headingmd}>What is your gender?</p>
        <div className={Styles.layout_inside_questionsGrid_2}>
          <div className={Styles.layout_inside_questionsGrid_questionItem}>
            <RadioBox
              _id="gender1"
              name="gender"
              fontSize="1.5rem"
              text="Male"
              value="Male"
              checked={gender === "Male"}
              onChange={handleChange}
            />
          </div>
          <div className={Styles.layout_inside_questionsGrid_questionItem}>
            <RadioBox
              _id="gender2"
              name="gender"
              fontSize="1.5rem"
              text="Female"
              value="Female"
              checked={gender === "Female"}
              onChange={handleChange}
            />
          </div>
        </div>
        {error && (
          <div className={Styles.layout_inside_questionsGrid_error}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenderQuestions;
