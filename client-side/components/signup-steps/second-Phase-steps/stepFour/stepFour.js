import { useEffect, useState } from "react";
import { occupationSchema } from "./validation";
import { validateV } from "../../../../lib/inputsValidation";
import WorkForm from "./workForm";
import NavigationButtons from "../navigationButtons/navigationButtons";
import Styles from "../steps.module.scss";

const StepFour = ({ step, setStep, stepFourForm, finishStepFour }) => {
  // console.log("stepFourForm", stepFourForm);

  const [counter, setCounter] = useState(stepFourForm.length);
  const [workInfos, setWorkInfos] = useState(stepFourForm);
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

    const res = await validateV(occupationSchema, workInfos);
    // console.log("ERRORS", res);
    setErrors(res || []);
    if (res.length !== 0) {
      // console.log("errors", errors);
      return;
    }

    finishStepFour(workInfos);
    setStep(++step);
  };

  const goPreviousStep = () => {
    finishStepFour(workInfos);
    setStep(--step);
  };

  const workInfosupdate = (data, ind) => {
    const workInfosupdated = [...workInfos];
    workInfosupdated[ind] = data;
    setWorkInfos(workInfosupdated);
  };

  const displayFormComponent = () => {
    return [...Array(counter).keys()].map((cmp) => (
      <WorkForm
        key={cmp}
        ind={cmp}
        workInfosupdate={workInfosupdate}
        work={workInfos[cmp]}
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
            <span className={Styles.headingmd}>Work:</span>
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

export default StepFour;
