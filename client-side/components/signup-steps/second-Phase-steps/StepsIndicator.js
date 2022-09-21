import StepGuide from "./stepGuide";
import Styles from "./secondSignupPhase.module.scss";
import Image from "next/image";

const StepIndicator = ({ step }) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.container_logoimg}>
        <Image src="/images/logo-w.svg" alt="Worka" height={45} width={160} />
      </div>

      <div className={Styles.stepIndicator}>
        <h2 className={Styles.stepIndicator_title}>
          Build your profile to be visible to companies and people.
        </h2>

        <StepGuide number={1} title="Occupation" step={step} special={true} />
        {/* <StepGuide number={2} title="Phone confirmation" step={step} /> */}
        <StepGuide number={2} title="Education" step={step} />
        <StepGuide number={3} title="Work experience" step={step} />
        <StepGuide number={4} title="BIO and confirmation" step={step} />
      </div>
    </div>
  );
};

export default StepIndicator;
