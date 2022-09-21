import Button from "../../button/Button";
import Loader from "../../common/loader/loader";
import Styles from "../loginPage.module.scss";

const ResetEmailVerification = ({ userEmail, resendEmail, loading }) => {
  return (
    <>
      <div>
        <h1 className={Styles.grid_left_head} style={{ textAlign: "start" }}>
          Check out your email.
        </h1>
      </div>
      <p className={Styles.grid_left_instruction}>
        We sent an email containing reset instructions to{" "}
        <span className={Styles.grid_left_instruction_bold}>{userEmail}</span>.
        if you did not receive an email, check your spam folder or click the
        button below to receive a new one.
      </p>
      {loading ? (
        <Loader />
      ) : (
        <Button
          text="Resend reset instructions"
          color="white"
          height="6rem"
          background="#0980C6"
          width="50rem"
          fontSize="1.5rem"
          onClick={resendEmail}
        />
      )}
    </>
  );
};

export default ResetEmailVerification;
