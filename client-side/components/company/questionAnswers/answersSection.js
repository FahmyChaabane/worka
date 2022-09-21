import AnswerInput from "../../common/answers/answerInput";
import Answers from "../../common/answers/answers";
import NoAnswerYet from "./noAnswerYet";
import Styles from "./questionsAnswers.module.scss";

const AnswersSection = ({ question }) => {
  return (
    <>
      {question.answers && question.answers.length > 0 ? (
        <>
          <h3 className={Styles.collapse_content_title}>
            {question.answers.length} Answers:
          </h3>
          <Answers answers={question.answers} />
        </>
      ) : (
        <NoAnswerYet />
      )}
      ; <AnswerInput />
    </>
  );
};

export default AnswersSection;
