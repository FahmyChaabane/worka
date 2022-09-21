import Link from "next/link";
import _ from "lodash";
import Input from "../../input/InputText";
import Button from "../../button/Button";
import Loader from "../../common/loader/loader";
import Styles from "./firstSignupPhase.module.scss";

const SignupForm = ({
  stepZeroForm,
  setSignupFormData,
  signUser,
  loading,
  error,
}) => {
  const handleChange = ({ currentTarget: input }) => {
    const data = { ...stepZeroForm };
    _.set(data, input.name, input.value);
    setSignupFormData(data);
  };

  return (
    <>
      <div>
        <h1 className={Styles.grid_left_head}>Signing up is the first step.</h1>
      </div>
      <div className={Styles.grid_left_special}>
        <div style={{ gridColumn: "1 / 2", gridRow: "1 / 1" }}>
          <Input
            name="name"
            placeholder="Name"
            value={stepZeroForm.name}
            onChange={handleChange}
            required={true}
          />
          {_.get(error, "name") && (
            <div className={Styles.grid_left_special_error}>{error.name}</div>
          )}
        </div>
        <div style={{ gridColumn: "2 / 3", gridRow: "1 / 1" }}>
          <Input
            name="surname"
            placeholder="Surname"
            value={stepZeroForm.surname}
            onChange={handleChange}
            required={true}
          />
          {_.get(error, "surname") && (
            <div className={Styles.grid_left_special_error}>
              {error.surname}
            </div>
          )}
        </div>
      </div>
      <Input
        name="email"
        placeholder="E-mail"
        value={stepZeroForm.email}
        onChange={handleChange}
        required={true}
      />
      {_.get(error, "email") && (
        <div className={Styles.grid_left_special_error}>{error.email}</div>
      )}
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={stepZeroForm.password}
        onChange={handleChange}
        required={true}
      />
      {_.get(error, "password") && (
        <div className={Styles.grid_left_special_error}>{error.password}</div>
      )}
      <Input
        type="password"
        name="repeatpassword"
        placeholder="Repeat Password"
        value={stepZeroForm.repeatpassword}
        onChange={handleChange}
        required={true}
      />
      {_.get(error, "repeatpassword") && (
        <div className={Styles.grid_left_special_error}>
          {error.repeatpassword}
        </div>
      )}
      <div className={Styles.box_container}>
        <input type="checkbox" />
        <span className={Styles.box_container_span}>
          By checking this you agree to the{" "}
          <a href="#">privacy policy, terms & condition</a> and the{" "}
          <a href="#">notifications settings.</a>
        </span>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Button text="Sign up" fontSize="1.5rem" onClick={signUser} />
          <div className={Styles.span}>
            <div className={Styles.span_container}>
              <span className={Styles.span_container_item}>
                {/* By singing with LinkedIn, Worka can have a better understanding
                of you and your needs. */}
              </span>
            </div>
          </div>
          {/* <Button
            text="LinkedIn"
            background="#E8F3FA"
            color="black"
            icon="linkedin"
            fill="#0E76A8"
          /> */}
          <div className={Styles.span_container}>
            <span className={Styles.span_container_item}>
              I already have an account, go to <Link href="/login">Log in</Link>
            </span>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default SignupForm;
