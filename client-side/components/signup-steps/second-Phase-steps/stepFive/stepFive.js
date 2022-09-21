import { useState } from "react";
import { checkMimeType, stepFiveSchema } from "./validation";
import { validateV } from "../../../../lib/inputsValidation";
import { convertToRaw } from "draft-js";
import BioForm from "./bioForm";
import UploadPhotoForm from "./uploadPhotoForm";
import NavigationButtons from "../navigationButtons/navigationButtons";
import _ from "lodash";
import Styles from "../steps.module.scss";

const StepFive = ({ step, setStep, stepFiveForm, finishStepFive, title }) => {
  const [stepForm, setStepForm] = useState(stepFiveForm);
  const [error, setError] = useState({});

  const setAvatarForm = (avatar) => {
    const data = { ...stepForm };
    data.avatar = avatar;
    setStepForm(data);
  };

  const setBioForm = (bio) => {
    const data = { ...stepForm };
    data.bio = bio;
    setStepForm(data);
  };

  const setBio2Form = (bio2) => {
    console.log(convertToRaw(bio2.getCurrentContent()));
    const data = { ...stepForm };
    data.bio2 = bio2;
    setStepForm(data);
  };

  const goNextStep = async () => {
    // console.log("stepFiveForm", stepForm);

    const errors = await validateV(stepFiveSchema, stepForm, checkMimeType);
    setError(errors || []);
    if (errors.length !== 0) {
      // console.log("errors", errors);
      return;
    }

    finishStepFive(stepForm);
    setStep(++step);
  };

  const goPreviousStep = () => {
    // console.log("stepFiveForm", stepForm);
    finishStepFive(stepForm);
    setStep(--step);
  };

  return (
    <div className={Styles.container_content}>
      <UploadPhotoForm
        avatar={stepForm.avatar}
        setAvatarForm={setAvatarForm}
        error={error[0]?.avatar}
        title={title}
      />
      <BioForm
        // bio={stepForm.bio}
        bio2={stepForm.bio2}
        // setBioForm={setBioForm}
        setBio2Form={setBio2Form}
        // errorb1={error[0]?.bio}
        errorb2={error[0]?.bio2}
      />
      <NavigationButtons
        goNextStep={goNextStep}
        goPreviousStep={goPreviousStep}
      />
    </div>
  );
};

export default StepFive;
