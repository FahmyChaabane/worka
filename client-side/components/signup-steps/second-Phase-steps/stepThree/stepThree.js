import { useEffect, useState } from "react";
import { educationSchema } from "./validation";
import { validateV } from "../../../../lib/inputsValidation";
import EducationForm from "./educationForm";
import NavigationButtons from "../navigationButtons/navigationButtons";
import Styles from "../steps.module.scss";

const StepThree = ({ step, setStep, stepThreeForm, finishStepThree }) => {
  // console.log("stepThreeForm", stepThreeForm);

  const [counter, setCounter] = useState(stepThreeForm.length);
  const [educationInfos, setEducationInfos] = useState(stepThreeForm);
  const [errors, setErrors] = useState([]);
  const [addError, setAddError] = useState(false);

  const addData = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    if (counter > 0) setAddError(false);
  }, [counter]);

  const goNextStep = async () => {
    if (counter === 0) return setAddError(true);

    const res = await validateV(educationSchema, educationInfos);
    // console.log("ERRORS", res);
    setErrors(res || []);
    if (res.length !== 0) {
      // console.log("errors", errors);
      return;
    }

    finishStepThree(educationInfos);
    setStep(++step);
  };

  const goPreviousStep = () => {
    finishStepThree(educationInfos);
    setStep(--step);
  };

  const educationInfosupdate = (data, ind) => {
    const educationInfosupdated = [...educationInfos];
    educationInfosupdated[ind] = data;
    setEducationInfos(educationInfosupdated);
  };

  const displayFormComponent = () => {
    return [...Array(counter).keys()].map((cmp) => (
      <EducationForm
        key={cmp}
        ind={cmp}
        educationInfosupdate={educationInfosupdate}
        education={educationInfos[cmp]}
        error={errors[cmp]}
      />
    ));
  };

  return (
    <div className={Styles.container_content}>
      {displayFormComponent()}

      <div
        className={[
          Styles.layout,
          addError ? Styles.layout_invalidborder : Styles.layout_validborder,
        ].join(" ")}
      >
        <div className={Styles.layout_inside}>
          <div className={Styles.layout_flexNoMargin}>
            <span className={Styles.headingmd}>Education:</span>
            <div className={Styles.layout_add} onClick={addData}>
              <svg className={Styles.layout_add_icon}>
                <use xlinkHref="/images/sprite.svg#icon-plus"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <NavigationButtons
        goNextStep={goNextStep}
        goPreviousStep={goPreviousStep}
      />
    </div>
  );
};

export default StepThree;
