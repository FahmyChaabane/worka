import SelectMenuOptions from "./selectMenuOptions";
import Link from "next/link";
import Styles from "./nav.module.scss";

const BeforeLoginNav = ({ addBorderHighlight }) => {
  return (
    <div className={Styles.container_right}>
      <div className={Styles.container_right_q}>
        <p>Are you a member ?</p>
      </div>

      <div className={Styles.container_right_paths}>
        <Link href="/login" passHref>
          <span
            style={addBorderHighlight("login")}
            className={Styles.container_right_paths_r}
          >
            Log in
          </span>
        </Link>
        <div className={Styles.container_right_paths_slash}></div>
        <Link href="/signup" passHref>
          <span
            style={addBorderHighlight("signup")}
            className={Styles.container_right_paths_r}
          >
            Sign up
          </span>
        </Link>
      </div>

      <label htmlFor="navi-toggle" className={Styles.container_right_menu}>
        <span className={Styles.container_right_menu_title}>
          Are you an Employer ?
        </span>
        <span className={Styles.container_right_menu_flesh}>
          <svg className={Styles.container_right_menu_flesh_sp}>
            <use href="/images/sprite.svg#icon-chevron-down"></use>
          </svg>
        </span>
      </label>
      <input
        type="checkbox"
        className={Styles.container_check}
        id="navi-toggle"
      />
      <SelectMenuOptions />
    </div>
  );
};

export default BeforeLoginNav;
