import Styles from "./input.module.scss";

const Input = ({ placeholder, name, label, id, required, ...rest }) => {
  return (
    <>
      {/* <label htmlFor={name}>{label}</label> */}
      <input
        className={Styles.text}
        // id={name}
        name={name}
        placeholder={required ? placeholder + "*" : placeholder}
        {...rest}
      />
    </>
  );
};

export default Input;
