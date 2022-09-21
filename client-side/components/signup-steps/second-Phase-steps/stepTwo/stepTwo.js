import CodeForm from "./codeForm";
import Styles from "../steps.module.scss";
import NavigationButtons from "../navigationButtons/navigationButtons";

const StepTwo = ({ step, setStep }) => {
  const goNextStep = () => {
    setStep(++step);
  };

  const goPreviousStep = () => {
    setStep(--step);
  };

  return (
    <div className={Styles.container_content}>
      <CodeForm />
      <NavigationButtons
        goNextStep={goNextStep}
        goPreviousStep={goPreviousStep}
      />
    </div>
  );
};

export default StepTwo;
