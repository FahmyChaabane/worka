import Styles from "./secondSignupPhase.module.scss";

const StepGuide = ({ number, title, step, special }) => {
  return (
    <div className={Styles.stepIndicator_step}>
      {number < step ? (
        <span className={Styles.checked}>
          <svg className={Styles.checked_icon}>
            <use xlinkHref="/images/sprite.svg#icon-check"></use>
          </svg>
        </span>
      ) : (
        <span
          style={{ opacity: step !== number && "0.5" }}
          className={Styles.stepIndicator_step_span}
        >
          {number}
        </span>
      )}
      {special ? (
        <div
          style={{ opacity: step !== number && "0.5" }}
          className={Styles.stepIndicator_step_par}
        >
          <h4 className={Styles.stepIndicator_step_title}>{title}</h4>
          <p className={Styles.stepIndicator_step_text}>
            Every information will help with your search and opportunities.
          </p>
        </div>
      ) : (
        <h4
          style={{ opacity: step !== number && "0.5" }}
          className={Styles.stepIndicator_step_title}
        >
          {title}
        </h4>
      )}
    </div>
  );
};

export default StepGuide;
