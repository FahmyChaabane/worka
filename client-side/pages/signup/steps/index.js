import { useState } from "react";
import SecondSignupPhase from "../../../components/signup-steps/second-Phase-steps/SecondSignupPhase";
// import { withAuthServerSideProps } from "../../../lib/withAuth";

const Steps = () => {
  const [step, setStep] = useState(1);
  return <SecondSignupPhase step={step} setStep={setStep} />;
};

export default Steps;
