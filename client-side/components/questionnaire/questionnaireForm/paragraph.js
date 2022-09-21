import Styles from "../questionnaire.module.scss";

const ParagraphQ = ({ value, questionIndex, updateResponse, disabled }) => {
  const handleChange = ({ currentTarget: input }) => {
    updateResponse(input.value, questionIndex);
  };

  return (
    <textarea
      className={Styles.layout_inside_styledTextArea}
      style={disabled ? { background: "#f0efef" } : { background: "white" }}
      placeholder="Answer Question..."
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

export default ParagraphQ;
