import Styles from "./companies.module.scss";

const CompaniesNav = () => {
  return (
    <div className={Styles.informations_nav}>
      <div className={Styles.informations_nav_left}>
        <span className={Styles.informations_nav_key}>
          Based on Following and applying
        </span>
        <h3 className={Styles.informations_nav_value}>There is 53 company:</h3>
      </div>
      <div className={Styles.informations_nav_right}>
        <span className={Styles.informations_nav_key}>Sort by:</span>
        <select className={Styles.informations_nav_selection}>
          <option>Date added</option>
          <option>99999</option>
          <option>99999</option>
          <option>99999</option>
        </select>
      </div>
    </div>
  );
};

export default CompaniesNav;
