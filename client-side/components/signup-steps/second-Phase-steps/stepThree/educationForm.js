import Input from "../../../input/InputText";
import Styles from "../steps.module.scss";
import { useEffect, useState } from "react";
import _ from "lodash";

const EducationForm = ({ ind, educationInfosupdate, education, error }) => {
  // console.log("educationInfos", educationInfos);
  // console.log("ERROR ya7beni", error);

  const data = {
    schoolName: "",
    from: {
      month: "",
      year: "",
    },
    to: {
      month: "",
      year: "",
    },
    degree: "",
    stillStudying: false,
  };

  const [educationData, setEducationData] = useState(education || data);

  useEffect(() => {
    // const educationInfosupdated = [...educationInfos];
    // educationInfosupdated[ind] = educationData;
    // setEducationInfos(educationInfosupdated);
    educationInfosupdate(educationData, ind);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [educationData]);

  const handleOnChange = ({ currentTarget: input }) => {
    const data = { ...educationData };
    _.set(
      data,
      input.name,
      input.type === "checkbox" ? input.checked : input.value
    );
    setEducationData(data);
  };

  return (
    <div
      className={[
        Styles.layout,
        error ? Styles.layout_invalidborder : Styles.layout_validborder,
      ].join(" ")}
    >
      <div className={Styles.layout_inside}>
        <div className={Styles.layout_flexNoMargin}>
          <span className={Styles.headingmd}>Education:</span>
          <div className={Styles.layout_flexNoMargin}>
            <span className={Styles.headingsm}>
              Still studying for this degree?
            </span>
            <input
              className={Styles.layout_inside_check}
              name="stillStudying"
              type="checkbox"
              id={`switch${ind}`}
              checked={educationData.stillStudying}
              onChange={handleOnChange}
            />
            <label
              className={Styles.layout_inside_toggle}
              htmlFor={`switch${ind}`}
            ></label>
          </div>
        </div>
        <div className={Styles.layout_inside_questionsGrid_2}>
          <div
            className={Styles.layout_inside_questionsGrid_questionItem_input}
          >
            <Input
              name="schoolName"
              placeholder="Name of the school."
              style={{ background: "white" }}
              value={educationData.schoolName}
              onChange={handleOnChange}
            />
            {_.get(error, "schoolName") && (
              <div className={Styles.layout_inside_questionsGrid_error}>
                {error.schoolName}
              </div>
            )}
          </div>

          <div
            className={Styles.layout_inside_questionsGrid_questionItem_input}
          >
            <p>Start Date:</p>
          </div>
          <div>
            <select
              className={[
                Styles.layout_inside_selection,
                Styles.headingsm,
              ].join(" ")}
              onChange={handleOnChange}
              name="from.month"
              value={educationData.from.month}
            >
              <option value="" disabled>
                Select Month
              </option>
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
            </select>
            {_.get(error, "from.month") && (
              <div className={Styles.layout_inside_questionsGrid_error}>
                {_.get(error, "from.month")}
              </div>
            )}
          </div>
          <div>
            <select
              className={[
                Styles.layout_inside_selection,
                Styles.headingsm,
              ].join(" ")}
              onChange={handleOnChange}
              name="from.year"
              value={educationData.from.year}
            >
              <option value="" disabled>
                Select Year
              </option>
              <option>1999</option>
              <option>2000</option>
              <option>2001</option>
              <option>2002</option>
            </select>
            {_.get(error, "from.year") && (
              <div className={Styles.layout_inside_questionsGrid_error}>
                {_.get(error, "from.year")}
              </div>
            )}
          </div>

          <div
            className={Styles.layout_inside_questionsGrid_questionItem_input}
          >
            <p>End Date:</p>
          </div>
          <div>
            <select
              className={[
                Styles.layout_inside_selection,
                Styles.headingsm,
              ].join(" ")}
              onChange={handleOnChange}
              name="to.month"
              value={educationData.to.month}
            >
              <option value="" disabled>
                Select Month
              </option>
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
            </select>
            {_.get(error, "to.month") && (
              <div className={Styles.layout_inside_questionsGrid_error}>
                {_.get(error, "to.month")}
              </div>
            )}
          </div>
          <div>
            <select
              className={[
                Styles.layout_inside_selection,
                Styles.headingsm,
              ].join(" ")}
              onChange={handleOnChange}
              name="to.year"
              value={educationData.to.year}
            >
              <option value="" disabled>
                Select Year
              </option>
              <option>1999</option>
              <option>2000</option>
              <option>2001</option>
              <option>2002</option>
            </select>
            {_.get(error, "to.year") && (
              <div className={Styles.layout_inside_questionsGrid_error}>
                {_.get(error, "to.year")}
              </div>
            )}
          </div>

          <div
            className={Styles.layout_inside_questionsGrid_questionItem_input}
          >
            <Input
              name="degree"
              placeholder="Degree."
              style={{ background: "white" }}
              value={educationData.degree}
              onChange={handleOnChange}
            />
            {_.get(error, "degree") && (
              <div className={Styles.layout_inside_questionsGrid_error}>
                {error.degree}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationForm;
