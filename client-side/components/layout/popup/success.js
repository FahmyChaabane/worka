import { useContext } from "react";
import { NotificationContext } from "../../../pages/_app";
import Styles from "./popup.module.scss";

const SuccessComponent = ({ succmsg }) => {
  const { setNotifySuccess } = useContext(NotificationContext);

  return (
    <section
      className={Styles.background}
      onClick={() => setNotifySuccess({ show: false })}
    >
      <div className={Styles.container}>
        <div
          className={[
            Styles.container_header,
            Styles.container_header_errorHead,
          ].join(" ")}
        >
          Success
          <div className={Styles.container_header_close}>
            <svg className={Styles.container_header_close_logo}>
              <use xlinkHref={`/images/sprite.svg#icon-plus`}></use>
            </svg>
          </div>
        </div>

        <div
          className={[
            Styles.container_notification,
            Styles.container_notification_success,
          ].join(" ")}
        >
          {succmsg}
        </div>
      </div>
      <div className={Styles.container_footer}></div>
    </section>
  );
};

export default SuccessComponent;
