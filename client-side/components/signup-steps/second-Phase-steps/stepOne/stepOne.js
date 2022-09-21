import { useState } from "react";
import { stepOneSchema } from "./validation";
import { validateV } from "../../../../lib/inputsValidation";
import BirthdayQuestions from "./birthdayQuestion";
import DomainQuestions from "./domainQuestion";
import ExpectationQuestions from "./expectationQuestion";
import GenderQuestions from "./genderQuestion";
import LocationQuestions from "./locationQuestion";
import PhoneQuestions from "./phoneQuestion";
import NavigationButtons from "../navigationButtons/navigationButtons";
import Styles from "../steps.module.scss";
// import StudyQuestions from "./studyQuestion";
// import WorkQuestions from "./workQuestion";

const StepOne = ({ step, setStep, stepOneForm, finishStepOne }) => {
  const [stepForm, setStepForm] = useState(stepOneForm);
  const [error, setError] = useState([]);

  const setExpectationQuestions = (expectation, checked) => {
    const data = { ...stepForm };

    if (checked) {
      data.expectations.push(expectation);
    } else {
      data.expectations.splice(data.expectations.indexOf(expectation), 1);
    }
    setStepForm(data);
  };

  const setGenderQuestions = (gender) => {
    const data = { ...stepForm };
    data.gender = gender;
    setStepForm(data);
  };

  const setLocationQuestions = (location) => {
    const data = { ...stepForm };
    data.location = location;
    setStepForm(data);
  };

  const setBirthdayQuestions = (birthday) => {
    const data = { ...stepForm };
    data.born = birthday;
    setStepForm(data);
  };

  const setDomainQuestions = (domain) => {
    const data = { ...stepForm };
    data.domain = domain;
    setStepForm(data);
  };

  const setPhoneQuestions = (phoneNumber) => {
    const data = { ...stepForm };
    data.phoneNumber = phoneNumber;
    setStepForm(data);
  };

  const goNextStep = async () => {
    // console.log("stepOneForm", stepForm);
    const errors = await validateV(stepOneSchema, stepForm);
    setError(errors || []);
    if (errors.length !== 0) {
      // console.log("errors", errors);
      return;
    }
    finishStepOne(stepForm);
    setStep(++step);
  };

  return (
    <div className={Styles.container_content}>
      <ExpectationQuestions
        expectations={stepForm.expectations}
        setExpectationQuestions={setExpectationQuestions}
        error={error[0]?.expectations}
      />

      <GenderQuestions
        gender={stepForm.gender}
        setGenderQuestions={setGenderQuestions}
        error={error[0]?.gender}
      />

      <LocationQuestions
        setLocationQuestions={setLocationQuestions}
        location={stepForm.location}
        error={error[0]?.location}
      />

      <BirthdayQuestions
        setBirthdayQuestions={setBirthdayQuestions}
        born={stepForm.born}
        error={error[0]?.born}
      />

      <DomainQuestions
        setDomainQuestions={setDomainQuestions}
        domain={stepForm.domain}
        error={error[0]?.domain}
      />

      <PhoneQuestions
        setPhoneQuestions={setPhoneQuestions}
        phoneNumber={stepForm.phoneNumber}
        error={error[0]?.phoneNumber}
      />

      <NavigationButtons
        goNextStep={goNextStep}
        buttonBack={{ visibility: "hidden" }}
      />
    </div>
  );
};

export default StepOne;
