import { useRouter } from "next/router";
import Image from "next/image";
import Availability from "../availability/availability";
import ProfileAvatar from "../avatars/profileAvatar";
import Styles from "./card.module.scss";

const UserIdentity = ({ userData }) => {
  const router = useRouter();

  const goToProfile = () => {
    router.push(`/profile/${userData.id}/skillReview`);
  };

  return (
    <div onClick={goToProfile} className={Styles.frame}>
      <div className={Styles.frame_img_mgn}>
        {/* <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URI}${userData.avatar}`}
          alt="user"
          className={Styles.frame_img}
          height={80}
          width={80}
        /> */}
        <ProfileAvatar
          condition={!!userData.avatar}
          src={`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URI}${userData.avatar}`}
          height={80}
          width={80}
          styleClass={Styles.frame_img}
        />
      </div>
      <div>
        <p className={Styles.frame_title}>
          {userData.name} {userData.surname}
        </p>
        <p className={Styles.frame_position}>{userData.job}</p>

        {/* <Availability availability={user.availability} /> */}
      </div>
    </div>
  );
};

export default UserIdentity;
