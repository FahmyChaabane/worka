import ProfileAvatar from "../../common/avatars/profileAvatar";
import Styles from "./skillReview.module.scss";

const ReviewersImages = ({ reviewerImgs }) => {
  if (reviewerImgs) {
    const images =
      reviewerImgs.length > 3 ? reviewerImgs.slice(0, 3) : reviewerImgs;
    return (
      <>
        {images.map((reviewer, index) => (
          <div
            key={index}
            className={Styles.details_element_mid_rating_counts_img}
          >
            {/* <Image
              // src={reviewerImgs}
              src="/images/reviewer.jpg"
              alt="user"
              className={Styles.details_element_mid_rating_counts_img}
              height={25}
              width={25}
            /> */}
            <ProfileAvatar
              condition={!!reviewer}
              src={`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URI}${reviewer}`}
              height={25}
              width={25}
              styleClass={Styles.details_element_mid_rating_counts_img}
            />
          </div>
        ))}
        {reviewerImgs.length > 3 && (
          <div className={Styles.details_element_mid_rating_counts_plus}>
            {reviewerImgs.length - 3}+
          </div>
        )}
      </>
    );
  }
};

export default ReviewersImages;
