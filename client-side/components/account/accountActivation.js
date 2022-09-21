import { useRouter } from "next/router";
import { useContext } from "react";
import { NotificationContext } from "../../pages/_app";
import handlingError from "../../lib/handlingError";
import Button from "../button/Button";
import axiosInstance from "../../lib/restAPI/restClientConfig";
import Styles from "./account.module.scss";

const AccountActivation = () => {
  const { setNotifyError, setNotifySuccess } = useContext(NotificationContext);
  const router = useRouter();

  const activate = async () => {
    try {
      const { data } = await axiosInstance.post("/signup/activate", {
        token: router.query.verification,
      });
      console.log("token should be here:", data);

      router.push("/login");
    } catch (error) {
      // console.log("error.message", error.message);
      if (error.response) handlingError(error.response.data, setNotifyError);
      else handlingError(error.message, setNotifyError);
    }
  };

  return (
    <div className={Styles.content}>
      <div className={Styles.content_paragraph}>
        <p className={Styles.content_paragraph_bold}>
          <span>{router.query.name}</span> <span> {router.query.surname}</span>
        </p>
        Click here to activate your account and get back to login page and start
        your journey in our platform!
      </div>
      <Button
        text="activate"
        color="white"
        height="3rem"
        background="#0980C6"
        width="40rem"
        fontSize="1.5rem"
        onClick={activate}
      />
    </div>
  );
};

export default AccountActivation;
