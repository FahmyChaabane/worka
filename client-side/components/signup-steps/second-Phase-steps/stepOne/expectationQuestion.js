import Styles from "../steps.module.scss";
import ExpectationOption from "./expectationOption";

const ExpectationQuestions = ({
  expectations,
  setExpectationQuestions,
  error,
}) => {
  const checkOptions = [
    {
      id: "check1",
      text: "I am here to review and get reviewed.",
      value: "expc1",
    },
    {
      id: "check2",
      text: "I am here to answer a form for someone.",
      value: "expc2",
    },
    {
      id: "check3",
      text: "I am here to search for jobs and opportunities.",
      value: "expc3",
    },
    {
      id: "check4",
      text: "I am here to explore the platform for the moment.",
      value: "expc4",
    },
  ];

  return (
    <div
      className={[
        Styles.layout,
        error ? Styles.layout_invalidborder : Styles.layout_validborder,
      ].join(" ")}
    >
      <div className={Styles.layout_inside}>
        <p className={Styles.headingsm}>Question:</p>
        <p className={Styles.headingmd}>
          What are your expectations from worka and how it is going to help you?
        </p>
        <div className={Styles.layout_inside_questionsGrid_2}>
          {checkOptions.map((option) => (
            <ExpectationOption
              key={option.id}
              id={option.id}
              text={option.text}
              value={option.value}
              setExpectationQuestions={setExpectationQuestions}
              check={expectations.includes(option.value)}
            />
          ))}
        </div>
        {error && (
          <div className={Styles.layout_inside_questionsGrid_error}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpectationQuestions;
