import NoReviewYet from "./noReviewYet";
import Reviews from "./reviews";

const ReviewSection = ({ reviews }) => {
  return reviews && reviews.length > 0 ? (
    <Reviews reviews={reviews} />
  ) : (
    <NoReviewYet />
  );
};

export default ReviewSection;
