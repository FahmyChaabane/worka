import Styles from "./answer.module.scss";
import Image from "next/image";

const AnswerItem = ({ answer }) => {
  return (
    <>
      <div className={Styles.answerHeader}>
        <div className={Styles.answerHeader_img_mgn}>
          <Image
            src={answer.userImg}
            alt="answer"
            className={Styles.answerHeader_img}
            height={50}
            width={50}
          />
        </div>
        {"1" === answer.id ? (
          <div className={Styles.answerHeader_companyAnswer}>
            <h4 className={Styles.element_value}>{answer.userName}</h4>
            <span className={Styles.answerHeader_companyAnswer_author}>
              Company answer
            </span>
          </div>
        ) : (
          <div>
            <span className={Styles.element_key}>{answer.userName}</span>
            <h3 className={Styles.element_value}>{answer.userPost}</h3>
          </div>
        )}
      </div>
      <div className={Styles.collapse_content_answer}>
        <h4>Answer:</h4>
        <p className={Styles.element_value}>{answer.answer}</p>
      </div>
    </>
  );
};

export default AnswerItem;
