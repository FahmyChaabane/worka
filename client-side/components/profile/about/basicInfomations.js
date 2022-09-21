import Styles from "./about.module.scss";

const BasicInformations = ({ other, location, born, email }) => {
  const data = [
    {
      icon: "location-pin",
      title: "Location",
      // text: "Tunis, Tunisia 11 Rue 4890 Lafayette",
      text: `${location?.country}, ${location?.city}, ${location?.address}`,
    },
    {
      icon: "cake",
      title: "Date of birth",
      text: `${born?.day} ${born?.month} ${born?.year}`,
    },
    {
      icon: "mail",
      title: "E-mail",
      text: `${email}`,
    },
  ];

  return (
    <div className={Styles.informations}>
      {data.map((info, index) => (
        <div
          key={index}
          className={[
            Styles.informations_cards,
            other ? Styles.frame : Styles.frameother,
          ].join(" ")}
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

export default BasicInformations;
