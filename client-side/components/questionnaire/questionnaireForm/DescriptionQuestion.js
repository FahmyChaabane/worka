import Styles from "../questionnaire.module.scss";

const DescriptionQuestion = () => {
  return (
    <div className={Styles.layout}>
      <div className={Styles.layout_header}>
        <p className={Styles.headingbg}>Write a comment</p>
      </div>
      <div className={Styles.layout_inside_questionsGrid_1}>
        <textarea
          className={Styles.layout_inside_styledTextArea}
          placeholder="Describe this particular user performence on this skill."
        />
      </div>
    </div>
  );
};

export default DescriptionQuestion;
