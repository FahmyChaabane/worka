import Styles from "./radiobox.module.scss";

const RadioBox = ({
  text,
  name,
  _id,
  fontSize,
  value,
  onChange,
  checked,
  disabled,
}) => {
  return (
    <div>
      <input
        type="radio"
        name={name}
        id={_id}
        checked={checked}
        className={Styles.radiobox}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <label className={Styles.container} htmlFor={_id}>
        <span className={Styles.checkmark}></span>
        <p style={{ fontSize }}>{text}</p>
      </label>
    </div>
  );
};

export default RadioBox;
