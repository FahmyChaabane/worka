import Styles from "./popup.module.scss";

const PopupAction = ({ children, action, setClose }) => {
  const handleOnclick = () => {
    action();
    setClose(false);
  };

  return (
    <div onClick={handleOnclick} className={Styles.container_action}>
      {children}
    </div>
  );
};

export default PopupAction;
