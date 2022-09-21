import Styles from "./nav.module.scss";

const SelectMenuOptions = () => {
  const titles = [
    { id: "0", title: "Sign up as a company" },
    { id: "1", title: "Log in as a company" },
    { id: "2", title: "Post a job" },
    { id: "3", title: "Pricing" },
    { id: "4", title: "How worka Will help you?" },
    { id: "5", title: "Contact us" },
  ];

  return (
    <div className={Styles.appMenu}>
      <nav className={Styles.appMenu_list}>
        {titles.map((item) => (
          <li key={item.id} className={Styles.appMenu_item}>
            <div className={Styles.appMenu_item_details}>
              <span className={Styles.appMenu_item_details_span}>
                {item.title}
              </span>
              <span className={Styles.appMenu_item_details_fake}></span>
            </div>
          </li>
        ))}
      </nav>
    </div>
  );
};

export default SelectMenuOptions;
