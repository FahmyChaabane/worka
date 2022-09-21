import Styles from "./header.module.scss";

const SavedHeader = () => {
  return (
    <>
      <div
        style={{ background: "#FE611D" }}
        className={Styles.container_header_user_photo}
      >
        <svg className={Styles.container_header_user_photo_logo}>
          <use href="/images/sprite.svg#icon-bookmark"></use>
        </svg>
      </div>
      <div className={Styles.container_header_user_title}>
        <h2 className={Styles.container_header_user_title_name}>Saved</h2>
        <span className={Styles.container_header_user_title_desc}>
          This is your space for my saved jobs, people and companies.
        </span>
      </div>
    </>
  );
};

export default SavedHeader;
