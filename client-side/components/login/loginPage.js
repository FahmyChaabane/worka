import { useContext, useState } from "react";
import { NotificationContext } from "../../pages/_app";
import { loginSchema } from "./validation";
import { validateV } from "../../lib/inputsValidation";
import Link from "next/link";
import _ from "lodash";
import axiosInstance from "../../lib/restAPI/restClientConfig";
import handlingError from "../../lib/handlingError";
import Input from "../input/InputText";
import Button from "../button/Button";
import Layout from "../layout/layout";
import Styles from "./loginPage.module.scss";

const LoginPage = () => {
  const { setNotifyError, setNotifySuccess } = useContext(NotificationContext);
  const form = {
    email: "",
    password: "",
  };
  const [loginForm, setLoginForm] = useState(form);
  const [error, setError] = useState([]);

  const goToFeed = async (e) => {
    e.preventDefault();
    const errors = await validateV(loginSchema, loginForm);
    setError(errors || []);
    if (errors.length !== 0) {
      return;
    }

    try {
      const { data } = await axiosInstance.post("/auth", loginForm);
      console.log("token should be here:", data);
      await fetch(new URL("api/login", process.env.NEXT_PUBLIC_SELF_HOST), {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: data }),
      });

      window.location.href = "/questionnaires/toAnswer";
    } catch (error) {
      // console.log("error.message", error.message);
      if (error.response) handlingError(error.response.data, setNotifyError);
      else handlingError(error.message, setNotifyError);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const data = { ...loginForm };
    _.set(data, input.name, input.value);
    setLoginForm(data);
  };

  return (
    <Layout>
      <main className={Styles.grid}>
        <form className={Styles.grid_left} onSubmit={goToFeed}>
          <div>
            <h1 className={Styles.grid_left_head}>
              Welcome again, Log in and get back to your steps.
            </h1>
          </div>
          <Input
            name="email"
            placeholder="E-mail"
            required={true}
            onChange={handleChange}
            value={loginForm.email}
          />
          {_.get(error[0], "email") && (
            <div className={Styles.grid_left_error}>{error[0].email}</div>
          )}
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required={true}
            onChange={handleChange}
            value={loginForm.password}
          />
          {_.get(error[0], "password") && (
            <div className={Styles.grid_left_error}>{error[0].password}</div>
          )}
          <div className={Styles.box_container}>
            <input type="checkbox" />
            <div className={Styles.box_container_span}>
              <span>Remember me</span>{" "}
              <Link href="/login/forget_password">I forgot my password</Link>
            </div>
          </div>
          <Button
            type="submit"
            text="Login"
            fontSize="1.5rem"
            // onClick={goToFeed}
          />
          <div className={Styles.span}>
            <div className={Styles.span_container}>
              <span className={Styles.span_container_item}>
                {/* Or you can log in using: */}
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
              I do not have an account , go to{" "}
              <Link href="/signup">Sign up</Link>
            </span>
          </div>
        </form>
        <div className={Styles.grid_right}>
          <div
            className={[
              Styles.grid_right_img,
              Styles.grid_right_img_login,
            ].join(" ")}
          ></div>
        </div>
      </main>
    </Layout>
  );
};

export default LoginPage;
