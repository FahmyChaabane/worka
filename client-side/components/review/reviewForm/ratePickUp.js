import RateItem from "./rateItem";
import Styles from "../review.module.scss";

const RatePickUp = ({ handleChange, rateValue, error }) => {
  const rates = [...Array(5).keys()];

  return (
    <div
      className={[
        Styles.layout,
        error ? Styles.layout_invalidborder : Styles.layout_validborder,
      ].join(" ")}
    >
      <div className={Styles.layout_inside}>
        <p className={Styles.headingsm}>Question:</p>
        <p className={Styles.headingmd}>
          In a scale of 1 to 5, how much rate do you give Nabil for this
          particular skill ?
        </p>
        <div className={Styles.layout_inside_pick}>
          {rates.map((item) => (
            <RateItem
              key={item}
              rate={item + 1}
              handleChange={handleChange}
              selected={item + 1 == rateValue}
            />
          ))}
        </div>
        {error && <div className={Styles.layout_inside_error}>{error}</div>}
      </div>
    </div>
  );
};

export default RatePickUp;
