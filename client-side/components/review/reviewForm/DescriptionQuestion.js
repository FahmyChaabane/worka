import Styles from "../review.module.scss";

const DescriptionQuestion = ({ description, handleChange }) => {
  return (
    <div className={Styles.layoutQ}>
      <div className={Styles.layoutQ_header}>
        <p className={Styles.headingbg}>Write a comment</p>
      </div>
      <div className={Styles.layoutQ_inside}>
        <div className={Styles.layoutQ_inside_questionsGrid_1}>
          <textarea
            name="description"
            className={Styles.layoutQ_styledTextArea}
            placeholder="Describe this particular user performence on this skill."
            value={description}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DescriptionQuestion;
