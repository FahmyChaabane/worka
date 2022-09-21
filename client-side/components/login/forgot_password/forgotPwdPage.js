import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { NotificationContext } from "../../../pages/_app";
import { validateV } from "../../../lib/inputsValidation";
import { schemaE, schemaR } from "../validation";
import _ from "lodash";
import axiosInstance from "../../../lib/restAPI/restClientConfig";
import SendResetEmailForm from "./sendResetEmailForm";
import ResetEmailVerification from "./resetEmailVerification";
import ResetPWDForm from "./resetPWDForm";
import handlingError from "../../../lib/handlingError";
import Layout from "../../layout/layout";
import Styles from "../loginPage.module.scss";

const ForgotPwdPage = () => {
  const formE = {
    email: "",
  };

  const formR = {
    password: "",
    repeatpassword: "",
  };

  const [forgotPWDForm, setForgotPWDForm] = useState(formE);
  const [resetPWDForm, setResetPWDForm] = useState(formR);
  const [createResetPWD, setCreateResetPWD] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);

  const { setNotifyError, setNotifySuccess } = useContext(NotificationContext);
  const router = useRouter();

  const sendEmail = async () => {
    const errors = await validateV(schemaE, forgotPWDForm);
    setError(errors || []);
    if (errors.length !== 0) {
      return;
    }

    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/signup/pwdResetRequest", {
        email: forgotPWDForm.email,
      });
      console.log("message should be here:", data);
      setLoading(false);
      setCreateResetPWD(true);
    } catch (error) {
      if (error.response) handlingError(error.response.data, setNotifyError);
      else handlingError(error.message, setNotifyError);
      setLoading(false);
    }
  };

  const resendEmail = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/signup/pwdResetRequest", {
        email: forgotPWDForm.email,
      });
      console.log("message should be here:", data);
      setLoading(false);
    } catch (error) {
      if (error.response) handlingError(error.response.data, setNotifyError);
      else handlingError(error.message, setNotifyError);
    }
  };

  const resetPassword = async () => {
    const errors = await validateV(schemaR, resetPWDForm);
    setError(errors || []);
    if (errors.length !== 0) {
      return;
    }

    try {
      const { data } = await axiosInstance.post("/signup/resetPassword", {
        token: router.query.verification,
        password: resetPWDForm.password,
      });
      console.log("message should be here:", data);
      router.push("/login");
    } catch (error) {
      if (error.response) handlingError(error.response.data, setNotifyError);
      else handlingError(error.message, setNotifyError);
    }
  };

  const displayLeftSideContent = () => {
    switch (router.pathname) {
      case "/login/forget_password":
        return createResetPWD ? (
          <ResetEmailVerification
            resendEmail={resendEmail}
            userEmail={forgotPWDForm.email}
            loading={loading}
          />
        ) : (
          <SendResetEmailForm
            forgotPWDForm={forgotPWDForm}
            setForgotPWDForm={setForgotPWDForm}
            sendEmail={sendEmail}
            loading={loading}
            error={error[0]}
          />
        );
      case "/login/reset_password":
        return (
          <ResetPWDForm
            resetPWDForm={resetPWDForm}
            setResetPWDForm={setResetPWDForm}
            resetPassword={resetPassword}
            error={error[0]}
          />
        );
      default:
        return <p> Something went wrong... </p>;
    }
  };

  return (
    <Layout>
      <main className={Styles.grid}>
        <div className={Styles.grid_left}>{displayLeftSideContent()}</div>
        <div className={Styles.grid_right}>
          <div
            className={[
              Styles.grid_right_img,
              Styles.grid_right_img_reset,
            ].join(" ")}
          ></div>
        </div>
      </main>
    </Layout>
  );
};

export default ForgotPwdPage;
