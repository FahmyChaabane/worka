import Styles from "./settings.module.scss";

const SettingsMenu = ({ setPage }) => {
  const menus = [
    { id: 1, title: "General" },
    { id: 2, title: "Notifcation Preferences" },
    { id: 3, title: "Privacy" },
  ];

  return (
    <div className={Styles.divideLeft}>
      <nav className={Styles.list}>
        {menus.map((item) => (
          <li
            key={item.id}
            className={Styles.list_item}
            onClick={() => setPage(item.id)}
          >
            {item.title}
          </li>
        ))}
      </nav>
    </div>
  );
};

export default SettingsMenu;
