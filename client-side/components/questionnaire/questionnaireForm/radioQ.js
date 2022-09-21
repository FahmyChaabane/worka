import RadioBox from "../../input/radiobox";
import Styles from "../questionnaire.module.scss";

const RadioQ = ({
  text,
  name,
  questionIndex,
  updateResponse,
  disabled,
  checked,
}) => {
  const handleChange = ({ currentTarget: input }) => {
    updateResponse(input.value, questionIndex);
  };

  console.log("RadioBox == HERE IT COMES! ::: ", text);

  return (
    <div
      key={text}
      className={Styles.layout_inside_questionsGrid_questionItem}
      style={disabled ? { background: "#f0efef" } : { background: "white" }}
    >
      <RadioBox
        _id={`${text}${questionIndex}`}
        name={name}
        fontSize="1.5rem"
        text={text}
        value={text}
        onChange={handleChange}
        disabled={disabled}
        checked={checked}
      />
    </div>
  );
};

export default RadioQ;
