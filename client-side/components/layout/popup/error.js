import { useContext } from "react";
import { NotificationContext } from "../../../pages/_app";
import Styles from "./popup.module.scss";

const ErrorComponent = ({ errmsg, code }) => {
  const { setNotifyError } = useContext(NotificationContext);

  return (
    <section
      className={Styles.background}
      onClick={() => setNotifyError({ show: false })}
    >
      <div className={Styles.container}>
        <div
          className={[
            Styles.container_header,
            Styles.container_header_errorHead,
          ].join(" ")}
        >
          Something went wrong
          <div className={Styles.container_header_close}>
            <svg className={Styles.container_header_close_logo}>
              <use xlinkHref={`/images/sprite.svg#icon-plus`}></use>
            </svg>
          </div>
        </div>

        <div
          className={[
            Styles.container_notification,
            Styles.container_notification_error,
          ].join(" ")}
        >
          {code && <p>{code}</p>}
          {errmsg}
        </div>
      </div>
      <div className={Styles.container_footer}></div>
    </section>
  );
};

export default ErrorComponent;
