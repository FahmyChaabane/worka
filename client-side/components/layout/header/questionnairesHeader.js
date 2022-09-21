import Styles from "./header.module.scss";
import Image from "next/image";

const QuestionnaireHeader = () => {
  return (
    <>
      <div className={Styles.container_header_user_photo}>
        <Image
          src="/images/questionnaire.png"
          alt="quest"
          height={70}
          width={70}
          className={Styles.container_header_user_photo}
        />
        {/* <svg className={Styles.container_header_user_photo_logo}>
          <use href="/images/sprite.svg#icon-bookmark"></use>
        </svg> */}
      </div>
      <div className={Styles.container_header_user_title}>
        <h2 className={Styles.container_header_user_title_name}>
          Questionnaire
        </h2>
        <span className={Styles.container_header_user_title_desc}>
          This is a list of all the questionnaires that you either have to send
          or to answer.
        </span>
      </div>
    </>
  );
};

export default QuestionnaireHeader;
