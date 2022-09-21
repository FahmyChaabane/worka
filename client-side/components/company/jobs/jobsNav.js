import Styles from "./jobs.module.scss";

const JobsNav = () => {
  return (
    <div className={Styles.informations_nav}>
      <div className={Styles.informations_nav_left}>
        <h3 className={Styles.informations_nav_value}>There is 2 live jobs:</h3>
      </div>
      <div className={Styles.informations_nav_right}>
        <span className={Styles.informations_nav_key}>Sort by:</span>
        <select className={Styles.informations_nav_selection}>
          <option>Relevance</option>
          <option>Date added</option>
          <option>99999</option>
        </select>
      </div>
    </div>
  );
};

export default JobsNav;
