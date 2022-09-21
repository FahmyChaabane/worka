import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../../../lib/queries/user";
import { useRouter } from "next/router";
import Image from "next/image";
import Styles from "./header.module.scss";
import ProfileAvatar from "../../common/avatars/profileAvatar";

const ProfileHeader = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: profileUser } = useQuery(GET_USER_PROFILE, {
    variables: { getUserProfileUserId: id },
    onCompleted: () => {
      console.log("profile data has come FROM PROFILEHEADER!");
    },
  });

  return (
    <>
      <div className={Styles.container_header_user_photo}>
        {/* {profileUser?.getUserProfile.avatar ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URI}${profileUser.getUserProfile.avatar}`}
            alt="profile"
            height={70}
            width={70}
            className={Styles.container_header_user_photo}
          />
        ) : (
          <Image
            src="/images/useravatarplaceholder.jpg"
            alt="profile"
            height={70}
            width={70}
            className={Styles.container_header_user_photo}
          />
        )} */}
        <ProfileAvatar
          condition={!!profileUser?.getUserProfile.avatar}
          src={`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URI}${profileUser?.getUserProfile.avatar}`}
          height={70}
          width={70}
          styleClass={Styles.container_header_user_photo}
        />
      </div>
      <div className={Styles.container_header_user_title}>
        <h2 className={Styles.container_header_user_title_name}>
          {profileUser?.getUserProfile.name}{" "}
          {profileUser?.getUserProfile.surname}
        </h2>
        <span className={Styles.container_header_user_title_desc}>
          {profileUser?.getUserProfile.domain.jobTitle}
        </span>
      </div>
    </>
  );
};

export default ProfileHeader;
