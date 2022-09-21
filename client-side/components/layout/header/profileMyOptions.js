import { useRouter } from "next/router";
import Styles from "./header.module.scss";

const ProfileMyOptions = ({ questionCount }) => {
  const router = useRouter();
  const { id } = router.query;

  console.log("3dad", questionCount);

  return (
    <div
      className={[
        Styles.container_header_options,
        Styles.container_header_options_me,
      ].join(" ")}
    >
      <div
        className={[
          Styles.container_header_options_questions,
          Styles.container_header_options_common,
        ].join(" ")}
        onClick={() => router.push(`/questionnaires/toAnswer`)}
      >
        <div className={Styles.container_header_options_questions_inside}>
          <span>
            <div className={Styles.container_header_options_questions_counter}>
              {questionCount}
            </div>
          </span>
          <div style={{ display: "inline" }}>
            <span>Questionnaire to answer</span>
          </div>
        </div>
      </div>
      {/* <div
        className={[
          Styles.container_header_options_suggestions,
          Styles.container_header_options_common,
        ].join(" ")}
        onClick={() => router.push("/find/collegues")}
      >
        <span>
          <svg className={Styles.container_header_options_logo}>
            <use href="/images/sprite.svg#icon-users"></use>
          </svg>
        </span>
        <span>Find people you know </span>
        <span className={Styles.container_header_options_suggestions_label}>
          To review and ask for review
        </span>
      </div> */}
      <div
        className={[
          Styles.container_header_options_edit,
          Styles.container_header_options_common,
        ].join(" ")}
        onClick={() => router.push(`/profile/${id}/edit/about`)}
      >
        <span>
          <svg className={Styles.container_header_options_logo}>
            <use href="/images/sprite.svg#icon-edit"></use>
          </svg>
        </span>
        <span>Edit profile</span>
      </div>
    </div>
  );
};

export default ProfileMyOptions;
