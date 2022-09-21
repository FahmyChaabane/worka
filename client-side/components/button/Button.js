import Styles from "./button.module.scss";

const Button = ({
  text,
  fontSize,
  width,
  color,
  background,
  border,
  icon,
  fill,
  height,
  visibility,
  ...rest
}) => {
  return (
    <div style={{ width, visibility }} className={Styles.container}>
      <button
        style={{
          color,
          width,
          background,
          border,
          fontSize,
          height,
        }}
        className={Styles.button}
        {...rest}
      >
        {icon && (
          <svg style={{ fill }} className={Styles.icon}>
            <use xlinkHref={`/images/sprite.svg#icon-${icon}`}></use>
          </svg>
        )}
        <span>{text}</span>
      </button>
    </div>
  );
};

export default Button;
