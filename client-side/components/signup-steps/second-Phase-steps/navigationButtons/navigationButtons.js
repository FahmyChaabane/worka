import Styles from "../steps.module.scss";
import Button from "../../../button/Button";

const NavigationButtons = ({
  goPreviousStep = () => {},
  goNextStep = () => {},
  buttonBack = {},
  buttonNext = {},
}) => {
  const { visibility: visibilityBtnOne } = buttonBack;
  const { visibility: visibilityBtnTwo } = buttonNext;
  return (
    <div className={Styles.layout_buttons}>
      <Button
        text="Back"
        color="#737474"
        icon="reply"
        fill="#737474"
        height="6rem"
        background="#F6F7F7"
        border="0.1rem solid #DFE0E1"
        width="20rem"
        fontSize="1.5rem"
        onClick={goPreviousStep}
        visibility={visibilityBtnOne ? visibilityBtnOne : "visible"}
      />
      <Button
        text="Next"
        color="white"
        height="6rem"
        background="black"
        width="20rem"
        fontSize="1.5rem"
        onClick={goNextStep}
        visibility={visibilityBtnTwo ? visibilityBtnTwo : "visible"}
      />
    </div>
  );
};

export default NavigationButtons;
