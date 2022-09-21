import _ from "lodash";
import Input from "../../input/InputText";
import Button from "../../button/Button";
import Loader from "../../common/loader/loader";
import Styles from "../loginPage.module.scss";

const SendResetEmailForm = ({
  sendEmail,
  forgotPWDForm,
  setForgotPWDForm,
  loading,
  error,
}) => {
  const handleChange = ({ currentTarget: input }) => {
    const data = { ...forgotPWDForm };
    _.set(data, input.name, input.value);
    setForgotPWDForm(data);
  };

  return (
    <>
      <div>
        <h1 className={Styles.grid_left_head}>
          Forgot your Password? Do not worry, we got you.
        </h1>
      </div>
      <p className={Styles.grid_left_instruction}>
        Enter the email address associated with your account.
      </p>

      <Input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={forgotPWDForm.email}
      />
      {_.get(error, "email") && (
        <div className={Styles.grid_left_error}>{error.email}</div>
      )}
      {loading ? (
        <Loader />
      ) : (
        <Button
          text="Send reset instructions"
          fontSize="1.5rem"
          onClick={sendEmail}
        />
      )}
    </>
  );
};

export default SendResetEmailForm;
