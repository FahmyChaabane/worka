import Input from "../../../input/InputText";
import Styles from "../steps.module.scss";
import { useEffect, useState } from "react";
import _ from "lodash";

const WorkForm = ({ ind, workInfosupdate, work, error }) => {
  // console.log("workInfos", workInfos);
  // console.log("ERROR ya7beni", error);

  const data = {
    companyName: "",
    from: {
      month: "",
      year: "",
    },
    to: {
      month: "",
      year: "",
    },
    post: "",
    stillWorking: false,
  };

  const [workData, setWorkData] = useState(work || data);

  useEffect(() => {
    // const workInfosupdated = [...workInfos];
    // workInfosupdated[ind] = workData;
    // setWorkInfos(workInfosupdated);
    workInfosupdate(workData, ind);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workData]);

  const handleOnChange = ({ currentTarget: input }) => {
    const data = { ...workData };
    _.set(
      data,
      input.name,
      input.type === "checkbox" ? input.checked : input.value
    );
    setWorkData(data);
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
          <span className={Styles.headingmd}>Work:</span>
          <div className={Styles.layout_flexNoMargin}>
            <span className={Styles.headingsm}>
              Are you still working here?
            </span>
            <input
              className={Styles.layout_inside_check}
              name="stillWorking"
              type="checkbox"
              id={`switch${ind}`}
              checked={workData.stillWorking}
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
              name="companyName"
              placeholder="Name of the company."
              style={{ background: "white" }}
              value={workData.companyName}
              onChange={handleOnChange}
            />
            {_.get(error, "companyName") && (
              <div className={Styles.layout_inside_questionsGrid_error}>
                {error.companyName}
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
              value={workData.from.month}
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
              value={workData.from.year}
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
              value={workData.to.month}
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
              value={workData.to.year}
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
              name="post"
              placeholder="Post."
              style={{ background: "white" }}
              value={workData.post}
              onChange={handleOnChange}
            />
            {_.get(error, "post") && (
              <div className={Styles.layout_inside_questionsGrid_error}>
                {error.post}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkForm;
