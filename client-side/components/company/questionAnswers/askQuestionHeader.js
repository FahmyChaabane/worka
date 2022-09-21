import Styles from "./questionsAnswers.module.scss";
import Image from "next/image";

const AskQuestionHeader = () => {
  return (
    <div className={Styles.element_left}>
      <div className={Styles.element_img_mgn}>
        <Image
          className={Styles.element_img}
          alt="company"
          src="/images/heroku.jpg"
          height={60}
          width={60}
        />
      </div>
      <div>
        <h3 className={Styles.element_key}>Ask Heroku a question:</h3>
        <span className={Styles.element_value}>
          wholesalers and retailers working in partnership to the benefit of
          all.
        </span>
      </div>
    </div>
  );
};

export default AskQuestionHeader;
