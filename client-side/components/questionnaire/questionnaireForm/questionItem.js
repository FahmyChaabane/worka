import CheckQ from "./checkQ";
import ParagraphQ from "./paragraph";
import RadioQ from "./radioQ";
import RateQ from "./rateQ";
import Styles from "../questionnaire.module.scss";

const QuestionItem = ({
  questionItem,
  questionIndex,
  updateResponse,
  error,
  isManager,
}) => {
  const rates = [...Array(5).keys()];

  const renderQuestionContainer = () => {
    switch (questionItem.type) {
      case "PARAGRAPH":
        return (
          <div className={Styles.layout_inside_questionsGrid_1}>
            <ParagraphQ
              value={questionItem.response}
              questionIndex={questionIndex}
              updateResponse={updateResponse}
              disabled={isManager}
            />
            {error && <div className={Styles.layout_inside_error}>{error}</div>}
          </div>
        );
      case "MULTI":
        return (
          <div className={Styles.layout_inside_questionsGrid_2}>
            {questionItem.choices.map((choice, index) => (
              <CheckQ
                key={index}
                text={choice.choiceQuestion}
                questionIndex={questionIndex}
                updateResponse={updateResponse}
                disabled={isManager}
                checked={questionItem.response.includes(choice.choiceQuestion)}
              />
            ))}
            {error && <div className={Styles.layout_inside_error}>{error}</div>}
          </div>
        );
      case "SINGLE":
        return (
          <div className={Styles.layout_inside_questionsGrid_2}>
            {questionItem.choices.map((choice, index) => (
              <RadioQ
                key={index}
                text={choice.choiceQuestion}
                name={questionItem.question}
                questionIndex={questionIndex}
                updateResponse={updateResponse}
                disabled={isManager}
                checked={questionItem.response === choice.choiceQuestion}
              />
            ))}
            {error && <div className={Styles.layout_inside_error}>{error}</div>}
          </div>
        );
      case "SCALE":
        return (
          <>
            <div className={Styles.layout_inside_pick}>
              {rates.map((item) => (
                <RateQ
                  key={item}
                  rate={item + 1}
                  selected={item + 1 == questionItem.response}
                  questionIndex={questionIndex}
                  updateResponse={updateResponse}
                  disabled={isManager}
                />
              ))}
            </div>
            {error && <div className={Styles.layout_inside_error}>{error}</div>}
          </>
        );
      default:
        break;
    }
  };
  return (
    <div className={Styles.layout}>
      <p className={Styles.headingsm}>Question:</p>
      <p className={Styles.headingmd}>{questionItem.question}</p>
      {renderQuestionContainer()}
    </div>
  );
};

export default QuestionItem;
