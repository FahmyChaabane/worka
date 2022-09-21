import Button from "../../../button/Button";
import Styles from "../steps.module.scss";

const StepSix = ({ completeUserAccount }) => {
  const backToLogin = () => {
    completeUserAccount();
  };

  return (
    <div
      className={[Styles.container_filled, Styles.container_content].join(" ")}
    >
      <div className={Styles.checkedContainer}>
        <svg className={Styles.checkedContainer_icon}>
          <use xlinkHref="/images/sprite.svg#icon-check"></use>
        </svg>
      </div>
      <p className={Styles.container_filled_paragraph}>
        Congratulations, you have successfully completed the required fields!
        Click the below button to confirm your infos and access your profile
      </p>
      <div className={Styles.layout_buttons_filled}>
        <Button
          text="Finish"
          color="white"
          height="6rem"
          background="#0980C6"
          width="50rem"
          fontSize="1.5rem"
          onClick={backToLogin}
        />
      </div>
    </div>
  );
};

export default StepSix;
