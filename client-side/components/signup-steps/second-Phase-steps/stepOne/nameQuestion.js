import Input from "../../../input/InputText";
import Styles from "../steps.module.scss";

const NameQuestion = ({
  name,
  surname,
  setNameQuestions,
  setSurNameQuestions,
  errorN,
  errorSN,
}) => {
  const handleChange = ({ currentTarget: input }) => {
    input.name === "name"
      ? setNameQuestions(input.value)
      : setSurNameQuestions(input.value);
  };

  return (
    <div
      className={[
        Styles.layout,
        errorN || errorSN
          ? Styles.layout_invalidborder
          : Styles.layout_validborder,
      ].join(" ")}
    >
      <div className={Styles.layout_inside}>
        <p className={Styles.headingsm}>Question:</p>
        <p className={Styles.headingmd}>Name and Surname of the user?</p>
        <div className={Styles.layout_inside_questionsGrid_2}>
          <div>
            <Input
              placeholder="Name."
              style={{ background: "white" }}
              onChange={handleChange}
              value={name}
              name="name"
            />
            {errorN && (
              <div className={Styles.layout_inside_questionsGrid_error}>
                {errorN}
              </div>
            )}
          </div>
          <div>
            <Input
              placeholder="Surname."
              style={{ background: "white" }}
              onChange={handleChange}
              value={surname}
              name="surname"
            />
            {errorSN && (
              <div className={Styles.layout_inside_questionsGrid_error}>
                {errorSN}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameQuestion;
