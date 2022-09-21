import Styles from "./about.module.scss";

const BasicFirstlyInformations = () => {
  const data = [
    {
      icon: "location-pin",
      title: "Location",
      text: "Sellicon Valley, California",
    },
    {
      icon: "calendar",
      title: "Date of birth",
      text: "24 april 1993",
    },
    {
      icon: "email",
      title: "E-mail",
      text: "info.service@heroku.com",
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

export default BasicFirstlyInformations;
