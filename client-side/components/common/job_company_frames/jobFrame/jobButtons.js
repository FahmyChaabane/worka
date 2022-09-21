import { useRouter } from "next/router";
import Styles from "../job_company.module.scss";

const JobButtons = ({ checked, setChecked }) => {
  const router = useRouter();

  return router.pathname.includes("applied") ? (
    <div
      className={[
        Styles.companyCard_header_actions_btn,
        Styles.companyCard_header_actions_btn_appliedbtn,
      ].join(" ")}
      onClick={() => {
        console.log("applied");
      }}
    >
      <span>Applied</span>
    </div>
  ) : (
    <div
      className={[
        Styles.companyCard_header_actions_btn,
        Styles.companyCard_header_actions_btn_seebtn,
      ].join(" ")}
      onClick={() => {
        setChecked(!checked);
        console.log("see job", checked);
      }}
    >
      {checked ? (
        <svg className={Styles.companyCard_header_actions_btn_icon}>
          <use href="/images/sprite.svg#icon-minus"></use>
        </svg>
      ) : (
        <svg className={Styles.companyCard_header_actions_btn_icon}>
          <use href="/images/sprite.svg#icon-plus"></use>
        </svg>
      )}

      <span>See job</span>
    </div>
  );
};

export default JobButtons;
