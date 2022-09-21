import { useContext, useState } from "react";
import { singupSchema } from "./validation";
import { NotificationContext } from "../../../pages/_app";
import { validateV } from "../../../lib/inputsValidation";
import _ from "lodash";
import axiosInstance from "../../../lib/restAPI/restClientConfig";
import handlingError from "../../../lib/handlingError";
import SignupForm from "./signupForm";
import SignupVerification from "./signupVerification";
import Layout from "../../layout/layout";
import Styles from "./firstSignupPhase.module.scss";

const Signup = () => {
  const formZero = {
    name: "",
    surname: "",
    email: "",
    password: "",
    repeatpassword: "",
  };

  const [stepZeroForm, setStepZeroForm] = useState(formZero);
  const [createAccount, setCreateAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);

  const { setNotifyError, setNotifySuccess } = useContext(NotificationContext);

  const setSignupFormData = (data) => {
    setStepZeroForm(data);
  };

  const userDTO = () => {
    return _.pick(stepZeroForm, ["name", "surname", "email", "password"]);
  };

  const signUser = async () => {
    const errors = await validateV(singupSchema, stepZeroForm);
    setError(errors || []);
    if (errors.length !== 0) {
      return;
    }

    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/signup", userDTO());

      console.log("message should be here:", data);
      setLoading(false);
      setCreateAccount(true);
    } catch (error) {
      if (error.response) handlingError(error.response.data, setNotifyError);
      else handlingError(error.message, setNotifyError);
      setLoading(false);
    }
  };

  const resendEmail = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/signup", userDTO());

      console.log("message should be here:", data);
      setLoading(false);
    } catch (error) {
      if (error.response) handlingError(error.response.data, setNotifyError);
      else handlingError(error.message, setNotifyError);
    }
  };

  return (
    <Layout>
      <main className={Styles.grid}>
        <section className={Styles.grid_left}>
          {createAccount ? (
            <SignupVerification
              resendEmail={resendEmail}
              userEmail={stepZeroForm.email}
              loading={loading}
            />
          ) : (
            <SignupForm
              stepZeroForm={stepZeroForm}
              setSignupFormData={setSignupFormData}
              signUser={signUser}
              loading={loading}
              error={error[0]}
            />
          )}
        </section>
        <div className={Styles.grid_right}>
          <div className={Styles.grid_right_img}></div>
        </div>
      </main>
    </Layout>
  );
};

export default Signup;
