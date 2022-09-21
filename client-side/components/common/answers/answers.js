import AnswerItem from "./answerItem";

const Answers = ({ answers }) => {
  return (
    <>
      {answers.map((answer) => (
        <AnswerItem key={answer.id} answer={answer} />
      ))}
    </>
  );
};

export default Answers;
