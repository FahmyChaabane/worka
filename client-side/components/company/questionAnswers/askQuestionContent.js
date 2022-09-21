import Styles from "./questionsAnswers.module.scss";
import Image from "next/image";

const AskQuestionContent = () => {
  return (
    <div style={{ background: "#fafafa" }} className={Styles.collapse_content}>
      <div className={Styles.collapse_content_form}>
        <div className={Styles.collapse_content_form_img_mgn}>
          <Image
            src="/images/harmion.jpeg"
            alt="user"
            className={Styles.collapse_content_form_img}
            height={70}
            width={70}
          />
        </div>
        <textarea
          placeholder="Ask your question here."
          className={Styles.collapse_content_form_textArea}
        />
      </div>
    </div>
  );
};

export default AskQuestionContent;
