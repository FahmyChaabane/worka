import { useState } from "react";
import AnswersSection from "./answersSection";
import Styles from "./questionsAnswers.module.scss";
import Image from "next/image";

const QuestionElement = ({ question }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className={Styles.frameel}>
      <div className={Styles.element}>
        <div className={Styles.element_left}>
          <div className={Styles.element_img_mgn}>
            <Image
              className={Styles.element_img}
              src={question.userImg}
              alt="question"
              height={60}
              width={60}
            />
          </div>

          <div>
            <span className={Styles.element_key}>{question.userName}</span>
            <h3 className={Styles.element_value}>{question.userPost}</h3>
          </div>
        </div>

        <div className={Styles.element_mid}>
          <p className={Styles.element_key}>{question.question}</p>
        </div>

        <input
          type="checkbox"
          id={`collapse ${question.id}`}
          className={Styles.element_checkbox}
          checked={checked}
          onChange={() => {
            setChecked(!checked);
            console.log("checked", checked);
          }}
        />
        <label
          htmlFor={`collapse ${question.id}`}
          className={Styles.element_right}
        >
          <div className={Styles.element_right_cercle}>
            <svg className={Styles.element_right_cercle_icon}>
              <use href="/images/sprite.svg#icon-chevron-down"></use>
            </svg>
          </div>
        </label>
      </div>
      {checked && (
        <div className={Styles.collapse}>
          <div className={Styles.collapse_content}>
            <AnswersSection question={question} />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionElement;
