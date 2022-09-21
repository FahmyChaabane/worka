import { useRouter } from "next/router";
import Button from "../../button/Button";
import Styles from "./infos.module.scss";

const LastStep = ({ userID }) => {
  const router = useRouter();

  return (
    <div className={[Styles.container, Styles.container_filled].join(" ")}>
      <div className={Styles.checkedContainer}>
        <svg className={Styles.checkedContainer_icon}>
          <use xlinkHref="/images/sprite.svg#icon-check"></use>
        </svg>
      </div>
      <p className={Styles.container_filled_title}>Submission Successful!</p>
      <p className={Styles.container_filled_paragraph}>
        Thank you for submitting the form, answers are saved to the server
      </p>
      <Button
        text="Back to Home"
        color="white"
        height="6rem"
        background="#0980C6"
        width="50rem"
        fontSize="1.5rem"
        onClick={() => router.push(`/profile/${userID}/skillReview`)}
      />
    </div>
  );
};

export default LastStep;
