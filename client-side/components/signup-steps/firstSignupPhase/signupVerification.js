import Button from "../../button/Button";
import Loader from "../../common/loader/loader";
import Styles from "./firstSignupPhase.module.scss";

const SignupVerification = ({ resendEmail, userEmail, loading }) => {
  return (
    <div className={Styles.grid_left_filled}>
      <div className={Styles.grid_left_checkedContainer}>
        <svg className={Styles.grid_left_checkedContainer_icon}>
          <use xlinkHref="/images/sprite.svg#icon-check"></use>
        </svg>
      </div>
      <p className={Styles.grid_left_filled_paragraph}>
        Congratulations, your profile was created!
      </p>
      <p className={Styles.grid_left_filled_paragraph}>
        In order to log in, you need to activate your account. We send an
        activation link to{" "}
        <span className={Styles.grid_left_filled_paragraph_bold}>
          {userEmail}{" "}
        </span>
        if you did not receive an email, check your spam folder or click the
        button below to receive a new one.
      </p>
      {loading ? (
        <Loader />
      ) : (
        <Button
          text="Resend activation link"
          color="white"
          height="6rem"
          background="#0980C6"
          width="50rem"
          fontSize="1.5rem"
          onClick={resendEmail}
        />
      )}
    </div>
  );
};

export default SignupVerification;
