import { useState } from "react";
import Checkbox from "../../../input/checkbox";
import Styles from "../steps.module.scss";

const ExpectationOption = ({
  id,
  text,
  value,
  setExpectationQuestions,
  check,
}) => {
  const [checked, setChecked] = useState(check);

  const handleChange = () => {
    setChecked(!checked);
    setExpectationQuestions(value, !checked);
  };

  return (
    <div className={Styles.layout_inside_questionsGrid_questionItem}>
      <Checkbox
        text={text}
        fontSize="1.5rem"
        checked={checked}
        id={id}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default ExpectationOption;
