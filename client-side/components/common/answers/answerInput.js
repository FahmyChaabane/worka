import Button from "../../button/Button";
import Styles from "./answer.module.scss";
import Image from "next/image";

const AnswerInput = () => {
  return (
    <>
      <div className={Styles.form}>
        <div className={Styles.form_img_mgn}>
          <Image
            src="/images/harmion.jpeg"
            alt="user"
            className={Styles.form_img}
            height={70}
            width={70}
          />
        </div>
        <textarea
          placeholder="Answer this question"
          className={Styles.form_textArea}
        />
      </div>

      <div className={Styles.form_btn}>
        <Button text="Answer" width="20rem" background="black" />
      </div>
    </>
  );
};

export default AnswerInput;
