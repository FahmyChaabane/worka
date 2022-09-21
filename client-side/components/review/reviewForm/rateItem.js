import { useRef } from "react";
import Styles from "../review.module.scss";

const RateItem = ({ rate, selected, handleChange }) => {
  const rateRef = useRef();

  const pickRate = () => {
    // if (rate == rateValue) {
    //   rateRef.current.style.color = "white";
    //   rateRef.current.style.background = "#0980c6";
    // } else {
    //   rateRef.current.style.color = "black";
    //   rateRef.current.style.background = "red";
    // }
    handleChange(rateRef.current.textContent);
  };

  return (
    <div
      className={[
        Styles.layout_inside_pick_choice,
        selected && Styles.layout_inside_pick_choice_selected,
      ].join(" ")}
      ref={rateRef}
      onClick={pickRate}
    >
      <span className={Styles.layout_inside_pick_choice_txt}>{rate}</span>
    </div>
  );
};

export default RateItem;
