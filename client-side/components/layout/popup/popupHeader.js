import Styles from "./popup.module.scss";

const PopupHeader = ({ children, setClose }) => {
  return (
    <div className={Styles.container_header}>
      <div
        className={Styles.container_header_close}
        onClick={() => setClose(false)}
      >
        <svg className={Styles.container_header_close_logo}>
          <use xlinkHref={`/images/sprite.svg#icon-plus`}></use>
        </svg>
      </div>
      {children}
    </div>
  );
};

export default PopupHeader;
