import _ from "lodash";
import Styles from "../steps.module.scss";

const LocationQuestions = ({ location, setLocationQuestions, error }) => {
  const handleChange = ({ currentTarget: input }) => {
    const locationobj = { ...location };
    _.set(locationobj, input.name, input.value);
    setLocationQuestions(locationobj);
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
        <p className={Styles.headingmd}>Where are you from?</p>
        <div className={Styles.layout_inside_questionsGrid_2}>
          <div>
            <select
              className={[
                Styles.layout_inside_selection,
                Styles.headingsm,
              ].join(" ")}
              onChange={handleChange}
              name="country"
              value={location.country}
            >
              <option value="" disabled>
                Select Country
              </option>
              <option>France</option>
              <option>Tunisia</option>
              <option>England</option>
              <option>Qatar</option>
            </select>
            {_.get(error, "country") && (
              <div className={Styles.layout_inside_questionsGrid_error}>
                {error.country}
              </div>
            )}
          </div>
          <div>
            <select
              className={[
                Styles.layout_inside_selection,
                Styles.headingsm,
              ].join(" ")}
              onChange={handleChange}
              name="city"
              value={location.city}
            >
              <option value="" disabled>
                Select City
              </option>
              <option>Paris</option>
              <option>Sfax</option>
              <option>Manchester</option>
              <option>Doha</option>
            </select>
            {_.get(error, "city") && (
              <div className={Styles.layout_inside_questionsGrid_error}>
                {error.city}
              </div>
            )}
          </div>
          <div
            className={Styles.layout_inside_questionsGrid_questionItem_textArea}
          >
            <textarea
              className={Styles.layout_inside_styledTextArea}
              placeholder="Write your detailed address here"
              name="address"
              value={location.address}
              onChange={handleChange}
            />
          </div>
        </div>
        {_.get(error, "address") && (
          <div className={Styles.layout_inside_questionsGrid_error}>
            {error.address}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationQuestions;
