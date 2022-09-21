import { useRouter } from "next/router";
import Image from "next/image";
import Button from "../../button/Button";
import moment from "moment";
import Styles from "./questionnaire.module.scss";

const QuestionItem = ({ quest, special }) => {
  const router = useRouter();

  console.log("item", quest.id);

  return (
    <div className={Styles.frame}>
      <div className={Styles.frame_header}>
        <div className={Styles.frame_header_company}>
          <div className={Styles.frame_header_company_logo}>
            <Image
              src="/images/companyplaceholder.png"
              alt="company"
              width={60}
              height={60}
              className={Styles.frame_header_company_logo_img}
            />
          </div>
          <div className={Styles.frame_header_company_logo}>
            <p className={Styles.title}>Company</p>
            <p className={Styles.text}>{quest.questionnaire.company.name}</p>
          </div>
          {/* <div className={Styles.frame_header_company_logo}>
            <p className={Styles.title}>Job title</p>
            <p className={Styles.text}>{quest.jobTitle}</p>
          </div> */}
        </div>
        <div className={Styles.frame_header_actions}>
          <Button
            text={
              special === "answered"
                ? "View Questionnaire"
                : special === "toanswer"
                ? "Answer Questionnaire"
                : "Send Questionnaire"
            }
            background={
              special === "answered"
                ? "#727272"
                : special === "toanswer"
                ? "#5ED18C"
                : "#0980C6"
            }
            fontSize="1.5rem"
            width="20rem"
            icon="file"
            fill="white"
            onClick={
              special === "answered"
                ? () =>
                    router.push(
                      quest.candidate
                        ? `/questionnaires/submitted/${quest.id}?userID=${quest.candidate.id}`
                        : `/questionnaires/submitted/${quest.id}`
                    )
                : special === "toanswer"
                ? () =>
                    router.push(
                      quest.sender
                        ? `/questionnaires/${quest.questionnaire.id}?userID=${quest.sender.id}`
                        : `/questionnaires/${quest.questionnaire.id}`
                    )
                : () => router.push(`/questionnaires/${quest.questionnaire.id}`)
            }
          />
          {special === "answered" && (
            <div className={Styles.frame_header_actions_eye}>
              <svg className={Styles.frame_header_actions_eye_icon}>
                <use xlinkHref={`/images/sprite.svg#icon-eye`}></use>
              </svg>
            </div>
          )}
        </div>
      </div>
      <div className={Styles.frame_content}>
        <div className={Styles.frame_content_item}>
          <p className={Styles.title}>Questionnaire Title:</p>
          <p className={Styles.text}>{quest.questionnaire.title}</p>
        </div>
        <div className={Styles.frame_content_item}>
          <p className={Styles.title}>Questionnaire Description:</p>
          <p className={Styles.text}>{quest.questionnaire.description}</p>
        </div>
        {/* {questionnaire.questionnaireType === "Video" ? (
          <div className={Styles.frame_content_item}>
            <p className={Styles.title}>Total recording time:</p>
            <p className={Styles.text}>{questionnaire.recordingTime}</p>
          </div>
        ) : (
          <div className={Styles.frame_content_item}>
            <p className={Styles.title}>Answer to:</p>
            <div className={Styles.frame_content_item_answerto}>
              <div className={Styles.frame_content_item_answerto_mrg}>
                <Image
                  src={questionnaire.answerTo.img}
                  alt="company"
                  width={30}
                  height={30}
                  className={Styles.frame_content_item_answerto_img}
                />
              </div>
              <div className={Styles.text}>{questionnaire.answerTo.name}</div>
            </div>
          </div>
        )} */}
        <div className={Styles.frame_content_item}>
          <p className={Styles.title}>Number of questions:</p>
          <p className={Styles.text}>{quest.questionnaire.questions.length}</p>
        </div>
        <div className={Styles.frame_content_item}>
          <p className={Styles.title}>Questionnaire date:</p>
          <p className={Styles.text}>
            {moment(quest.questionnaire.createdAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
