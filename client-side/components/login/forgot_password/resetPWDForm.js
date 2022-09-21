import _ from "lodash";
import Button from "../../button/Button";
import Input from "../../input/InputText";
import Styles from "../loginPage.module.scss";

const ResetPWDForm = ({
  resetPWDForm,
  setResetPWDForm,
  resetPassword,
  error,
}) => {
  const handleChange = ({ currentTarget: input }) => {
    const data = { ...resetPWDForm };
    _.set(data, input.name, input.value);
    setResetPWDForm(data);
  };

  return (
    <>
      <div>
        <h1 className={Styles.grid_left_head}>Create new password.</h1>
      </div>
      <p className={Styles.grid_left_instruction}>
        Your new password must be different from your old password.
      </p>
      <Input
        type="password"
        name="password"
        placeholder="Password"
        required={true}
        onChange={handleChange}
        value={resetPWDForm.password}
      />
      {_.get(error, "password") && (
        <div className={Styles.grid_left_error}>{error.password}</div>
      )}
      <Input
        type="password"
        name="repeatpassword"
        placeholder="Confirm Password"
        required={true}
        onChange={handleChange}
        value={resetPWDForm.repeatpassword}
      />
      {_.get(error, "repeatpassword") && (
        <div className={Styles.grid_left_error}>{error.repeatpassword}</div>
      )}
      <Button text="Validate" fontSize="1.5rem" onClick={resetPassword} />
    </>
  );
};

export default ResetPWDForm;
