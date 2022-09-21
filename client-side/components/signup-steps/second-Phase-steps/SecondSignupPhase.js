import { useContext, useState } from "react";
import { COMPLETE_USER_ACCOUNT } from "../../../lib/mutations/signup";
import { GET_CURRENT_USER } from "../../../lib/queries/user";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { NotificationContext } from "../../../pages/_app";
import { convertToRaw, EditorState } from "draft-js";
import handlingError from "../../../lib/handlingError";
import Divide from "../../layout/common/divide";
import StepOne from "./stepOne/stepOne";
import StepTwo from "./stepTwo/stepTwo";
import StepThree from "./stepThree/stepThree";
import StepFour from "./stepFour/stepFour";
import StepFive from "./stepFive/stepFive";
import StepSix from "./stepSix/stepSix";
import StepsIndicator from "./StepsIndicator";
import Styles from "./steps.module.scss";

const SecondSignupPhase = ({ step, setStep }) => {
  const FormOne = {
    expectations: [],
    gender: "",
    location: {
      country: "",
      city: "",
      address: "",
    },
    born: {
      day: "",
      month: "",
      year: "",
    },
    domain: {
      name: "",
      jobTitle: "",
    },
    phoneNumber: {
      countryCode: "",
      number: "",
    },
  };
  const FormThree = [];
  const FormFour = [];
  const FormFive = {
    avatar: null,
    // bio: "",
    bio2: EditorState.createEmpty(),
  };

  const [stepOneForm, setStepOneForm] = useState(FormOne);
  const [stepThreeForm, setStepThreeForm] = useState(FormThree);
  const [stepFourForm, setStepFourForm] = useState(FormFour);
  const [stepFiveForm, setStepFiveForm] = useState(FormFive);

  const { setNotifyError, setNotifySuccess } = useContext(NotificationContext);

  const router = useRouter();

  const [completeUserAccountMutation] = useMutation(COMPLETE_USER_ACCOUNT, {
    onCompleted: ({ completeUserAccount }) => {
      console.log("FINISH!", completeUserAccount);
      router.push(`/profile/${completeUserAccount.id}/about`);
      setNotifySuccess({ show: true, msg: "Profile Updated succesfully!" });
    },
    onError: (error) => {
      handlingError(error, setNotifyError);
    },
  });

  const finishAccount = () => {
    completeUserAccountMutation({
      variables: {
        completeUserAccountData: {
          ...stepOneForm,
          ...{ education: stepThreeForm },
          ...{ work: stepFourForm },
          ...{
            avatar: stepFiveForm.avatar,
            // bio: stepFiveForm.bio,
            bio2: JSON.stringify(
              convertToRaw(stepFiveForm.bio2.getCurrentContent())
            ),
          },
        },
      },
      refetchQueries: [GET_CURRENT_USER],
    });
  };

  const finishStepOne = (data) => {
    console.log("passONE", data);
    setStepOneForm(data);
  };
  const finishStepThree = (data) => {
    console.log("passTHREE", data);
    setStepThreeForm(data);
  };

  const finishStepFour = (data) => {
    console.log("passFOUR", data);
    setStepFourForm(data);
  };
  const finishStepFive = (data) => {
    console.log("passFIVE", data);
    // const diti = { ...data };
    // diti.bio2 = convertToRaw(diti.bio2.getCurrentContent());
    setStepFiveForm(data);
  };

  const renterStep = (step) => {
    switch (step) {
      case 1:
        return (
          <StepOne
            step={step}
            setStep={setStep}
            stepOneForm={stepOneForm}
            finishStepOne={finishStepOne}
          />
        );
      // case 2:
      //   return <StepTwo step={step} setStep={setStep} />;
      case 2:
        return (
          <StepThree
            step={step}
            setStep={setStep}
            stepThreeForm={stepThreeForm}
            finishStepThree={finishStepThree}
          />
        );
      case 3:
        return (
          <StepFour
            step={step}
            setStep={setStep}
            stepFourForm={stepFourForm}
            finishStepFour={finishStepFour}
          />
        );
      case 4:
        return (
          <StepFive
            step={step}
            setStep={setStep}
            stepFiveForm={stepFiveForm}
            finishStepFive={finishStepFive}
            title={stepOneForm.domain.jobTitle}
          />
        );
      case 5:
        return <StepSix completeUserAccount={finishAccount} />;
      default:
        return <p>Something went wrong...</p>;
    }
  };

  return (
    <Divide>
      <StepsIndicator step={step} />

      <section className={Styles.container}>{renterStep(step)}</section>
    </Divide>
  );
};

export default SecondSignupPhase;
