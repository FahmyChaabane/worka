import Styles from "./availability.module.scss";

const Availability = ({ availability }) => {
  const container =
    availability === "looking"
      ? Styles.availability_looking
      : availability === "working"
      ? Styles.availability_working
      : availability === "available"
      ? Styles.availability_available
      : null;

  const toggle =
    availability === "looking"
      ? Styles.availability_status_looking
      : availability === "working"
      ? Styles.availability_status_working
      : availability === "available"
      ? Styles.availability_status_available
      : null;

  const text =
    availability === "looking"
      ? "Looking for new opportunities"
      : availability === "working"
      ? "Currently working"
      : availability === "available"
      ? "Available for work"
      : "";

  return (
    <div className={[container, Styles.availability].join(" ")}>
      <span className={[toggle, Styles.availability_status].join(" ")}></span>
      <span>{text}</span>
    </div>
  );
};

export default Availability;
