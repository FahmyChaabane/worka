import RadioBox from "../../../input/radiobox";
import Styles from "../steps.module.scss";

const StudyQuestions = () => {
  return (
    <div className={Styles.layout}>
      <div className={Styles.layout_inside}>
        <p className={Styles.headingsm}>Question:</p>
        <p className={Styles.headingmd}>Are you currently studying?</p>
        <div className={Styles.layout_inside_questionsGrid_2}>
          <div className={Styles.layout_inside_questionsGrid_questionItem}>
            <RadioBox _id="study1" name="study" fontSize="1.5rem" text="Yes." />
          </div>
          <div className={Styles.layout_inside_questionsGrid_questionItem}>
            <RadioBox _id="study2" name="study" fontSize="1.5rem" text="No." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyQuestions;
