import { useState } from "react";
import ReviewElement from "./reviewElement";
import Styles from "./skillReview.module.scss";

const Reviews = ({ reviews }) => {
  const [current, setCurrent] = useState(0);
  const length = reviews.length;

  const goPrev = () => {
    console.log("prev");
    setCurrent(current - 1);
  };

  const goNext = () => {
    console.log("next");
    setCurrent(current + 1);
  };

  return (
    <>
      <div
        className={Styles.details_collapse_content_back}
        style={current === 0 ? { background: "#B9BABC" } : null}
        onClick={current === 0 ? () => {} : goPrev}
      >
        <svg className={Styles.details_element_right_cercle_icon}>
          <use href="/images/sprite.svg#icon-chevron-left"></use>
        </svg>
      </div>

      {reviews.map(
        (review, index) =>
          index === current && (
            <div
              className={Styles.details_collapse_content_review_slideactive}
              key={index}
            >
              <ReviewElement key={review.id} review={review} />
            </div>
          )
      )}

      <div
        className={Styles.details_collapse_content_forward}
        style={current === length - 1 ? { background: "#B9BABC" } : null}
        onClick={current === length - 1 ? () => {} : goNext}
      >
        <svg className={Styles.details_element_right_cercle_icon}>
          <use href="/images/sprite.svg#icon-chevron-right"></use>
        </svg>
      </div>
    </>
  );
};

export default Reviews;
