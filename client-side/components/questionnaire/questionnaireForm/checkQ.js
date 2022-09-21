import Checkbox from "../../input/checkbox";
import Styles from "../questionnaire.module.scss";

const CheckQ = ({ text, questionIndex, updateResponse, disabled, checked }) => {
  const handleChange = ({ currentTarget: input }) => {
    updateResponse(input.value, questionIndex, "MULT", input.checked);
  };

  console.log("Checkbox == HERE IT COMES! ::: ", text);

  return (
    <div
      key={text}
      className={Styles.layout_inside_questionsGrid_questionItem}
      style={disabled ? { background: "#f0efef" } : { background: "white" }}
    >
      <Checkbox
        text={text}
        fontSize="1.5rem"
        id={`${text}${questionIndex}`}
        value={text}
        onChange={handleChange}
        disabled={disabled}
        checked={checked}
      />
    </div>
  );
};

export default CheckQ;
