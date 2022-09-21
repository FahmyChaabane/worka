import Styles from "./header.module.scss";

const AppliedJobsHeader = () => {
  return (
    <>
      <div
        style={{ background: "#60C7AB" }}
        className={Styles.container_header_user_photo}
      >
        <svg className={Styles.container_header_user_photo_logo}>
          <use href="/images/sprite.svg#icon-case"></use>
        </svg>
      </div>
      <div className={Styles.container_header_user_title}>
        <h2 className={Styles.container_header_user_title_name}>
          Applied jobs
        </h2>
        <span className={Styles.container_header_user_title_desc}>
          This is where you can find the jobs you have applied in.
        </span>
      </div>
    </>
  );
};

export default AppliedJobsHeader;
