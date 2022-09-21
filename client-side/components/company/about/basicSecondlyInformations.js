import Styles from "./about.module.scss";

const BasicSecondlyInformations = () => {
  const data = [
    {
      icon: "globe",
      title: "Website",
      text: "www.heroku.com",
    },
    {
      icon: "bulb",
      title: "Industry",
      text: "Cloud Services",
    },
    {
      icon: "attachment",
      title: "Type",
      text: "LLC",
    },
  ];

  return (
    <div className={Styles.informations}>
      {data.map((info, index) => (
        <div
          key={index}
          className={[Styles.informations_cards, Styles.frameother].join(" ")}
        >
          <div className={Styles.informations_cards_division}>
            <svg className={Styles.informations_cards_logo}>
              <use href={`/images/sprite.svg#icon-${info.icon}`}></use>
            </svg>
          </div>
          <div>
            <span className={Styles.informations_cards_title}>
              {info.title}
            </span>
            <h3 className={Styles.informations_cards_value}>{info.text}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BasicSecondlyInformations;
