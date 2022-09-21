import Styles from "./header.module.scss";

const CompanyOptions = () => {
  return (
    <div
      className={[
        Styles.container_header_options,
        Styles.container_header_options_company,
      ].join(" ")}
    >
      <div
        className={[
          Styles.container_header_options_other_msg,
          Styles.container_header_options_common,
        ].join(" ")}
      >
        <span>
          <svg className={Styles.container_header_options_logo}>
            <use href="/images/sprite.svg#icon-chati"></use>
          </svg>
        </span>
        <span>Message</span>
      </div>
      <div className={Styles.container_header_options_other_edit}>
        <span>
          <svg className={Styles.container_header_options_other_edit_logo}>
            <use href="/images/sprite.svg#icon-options"></use>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default CompanyOptions;
