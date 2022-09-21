import moment from "moment";
import ProfileAvatar from "../../common/avatars/profileAvatar";
import Styles from "./skillReview.module.scss";

const ReviewElement = ({ review }) => {
  const { reviewer, relationship, rate, description, createdAt } = review;
  return (
    <div className={Styles.details_collapse_content_review}>
      <div className={Styles.details_collapse_content_review_top}>
        <div className={Styles.details_collapse_content_review_top_left}>
          <div style={{ marginRight: "2rem" }}>
            {/* <Image
              className={Styles.details_collapse_content_review_top_left_img}
              src={`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URI}${reviewer.avatar}`}
              alt="user"
              height={40}
              width={40}
            /> */}
            <ProfileAvatar
              condition={!!reviewer.avatar}
              src={`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URI}${reviewer.avatar}`}
              height={45}
              width={45}
              styleClass={Styles.details_collapse_content_review_top_left_img}
            />
          </div>
          <div>
            <span className={Styles.details_collapse_content_review_key}>
              Reviewer:
            </span>
            <p className={Styles.details_collapse_content_review_value}>
              {reviewer.name} {reviewer.surname}
            </p>
            <p className={Styles.details_collapse_content_review_value_v}>
              {reviewer.domain.jobTitle}
            </p>
          </div>
        </div>
        <div className={Styles.details_collapse_content_review_top_right}>
          <span className={Styles.details_collapse_content_review_key}>
            Relationship:
          </span>
          <p className={Styles.details_collapse_content_review_value_v}>
            {relationship}
          </p>
        </div>
      </div>
      <div className={Styles.details_collapse_content_review_midtop}>
        <span
          className={Styles.details_collapse_content_review_midtop_rateValue}
        >
          {rate}
        </span>

        <div
          className={Styles.details_collapse_content_review_midtop_ratingBar}
        >
          <div
            style={{
              width: `${(rate * 100) / 5}%`,
            }}
          >
            <span
              className={
                Styles.details_collapse_content_review_midtop_ratingBar_result
              }
            ></span>
          </div>
        </div>
      </div>
      <div className={Styles.details_collapse_content_review_midbottom}>
        {description}
      </div>
      <div
        className={[
          Styles.details_collapse_content_review_bottom,
          Styles.details_collapse_content_review_value_v,
        ].join(" ")}
      >
        {moment(createdAt).fromNow()}
      </div>
    </div>
  );
};

export default ReviewElement;
