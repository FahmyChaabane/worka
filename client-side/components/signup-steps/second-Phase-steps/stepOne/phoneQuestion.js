import _ from "lodash";
import Input from "../../../input/InputText";
import Styles from "../steps.module.scss";

const PhoneQuestions = ({ phoneNumber, setPhoneQuestions, error }) => {
  const handleChange = ({ currentTarget: input }) => {
    const phoneNumberObj = { ...phoneNumber };
    _.set(phoneNumberObj, input.name, input.value);
    setPhoneQuestions(phoneNumberObj);
  };

  return (
    <div
      className={[
        Styles.layout,
        error ? Styles.layout_invalidborder : Styles.layout_validborder,
      ].join(" ")}
    >
      <div className={Styles.layout_inside}>
        <p className={Styles.headingsm}>Question:</p>
        <p className={Styles.headingmd}>What is your phone number?</p>
        <div className={Styles.layout_inside_questionsGrid_3}>
          <div>
            <select
              className={[
                Styles.layout_inside_selection,
                Styles.headingsm,
              ].join(" ")}
              onChange={handleChange}
              name="countryCode"
              value={phoneNumber.countryCode}
            >
              <option value="" disabled>
                Code
              </option>
              <option>+216</option>
              <option>+01</option>
              <option>+99</option>
            </select>
            {_.get(error, "countryCode") && (
              <div className={Styles.layout_inside_questionsGrid_error}>
                {error.countryCode}
              </div>
            )}
          </div>

          <div
            className={Styles.layout_inside_questionsGrid_questionItem_phone}
          >
            <Input
              placeholder="Phone number."
              style={{ background: "white" }}
              onChange={handleChange}
              value={phoneNumber.number}
              name="number"
            />
            {_.get(error, "number") && (
              <div className={Styles.layout_inside_questionsGrid_error}>
                {error.number}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneQuestions;
