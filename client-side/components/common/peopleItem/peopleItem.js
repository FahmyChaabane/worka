import { useRouter } from "next/router";
import Availability from "../../common/availability/availability";
import ProfileAvatar from "../avatars/profileAvatar";
import Styles from "./peopleItem.module.scss";

const PeopleItem = ({ people }) => {
  const router = useRouter();
  const goToProfile = () => {
    router.push(`/profile/${people.id}/skillReview`);
  };
  return (
    <div onClick={goToProfile} className={Styles.frame}>
      <div className={Styles.frame_img_mrg}>
        <ProfileAvatar
          condition={!!people.avatar}
          src={`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URI}${people.avatar}`}
          height={80}
          width={80}
          styleClass={Styles.frame_img}
        />
      </div>
      <div style={{ width: "70%" }}>
        <h4 className={Styles.frame_title}>
          {people.name} {people.surname}
        </h4>
        <p className={Styles.frame_position}>{people.domain.jobTitle}</p>
        <span className={Styles.frame_location}>
          {people.location.city},{people.location.country}
        </span>

        {/* <Availability availability={people.availability} /> */}
      </div>
    </div>
  );
};

export default PeopleItem;
