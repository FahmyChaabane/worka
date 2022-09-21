import { useRef } from "react";
import Styles from "../questionnaire.module.scss";

const RateQ = ({ rate, selected, questionIndex, updateResponse, disabled }) => {
  const rateRef = useRef();

  const pickRate = () => {
    updateResponse(rateRef.current.textContent, questionIndex);
  };

  console.log("selected?  ", selected);

  return (
    <div
      className={[
        Styles.layout_inside_pick_choice,
        selected && Styles.layout_inside_pick_choice_selected,
        !disabled && Styles.layout_inside_pick_choice_actions,
      ].join(" ")}
      style={
        disabled && selected
          ? { background: "#7ec9f5" }
          : disabled
          ? { background: "#f0efef" }
          : { background: "" }
      }
      ref={rateRef}
      onClick={disabled ? () => {} : pickRate}
    >
      <span className={Styles.layout_inside_pick_choice_txt}>{rate}</span>
    </div>
  );
};

export default RateQ;
