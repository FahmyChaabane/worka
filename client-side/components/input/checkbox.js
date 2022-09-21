import Styles from "./checkbox.module.scss";

const Checkbox = ({
  text,
  fontSize,
  id,
  value,
  onChange,
  checked,
  disabled,
}) => {
  return (
    <div>
      <input
        type="checkbox"
        className={Styles.checkbox}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
      <label className={Styles.container} htmlFor={id}>
        <span className={Styles.carro}>
          <span className={Styles.moin}></span>
        </span>
        <p style={{ fontSize }}> {text} </p>
      </label>
    </div>
  );
};

export default Checkbox;
