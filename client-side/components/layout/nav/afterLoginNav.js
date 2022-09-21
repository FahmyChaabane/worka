import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "../../providers/userProvider";
import NotificationsMenu from "./notificationsMenu";
import ProfileMenuOptions from "./profileMenuOptions";
import ProfileAvatar from "../../common/avatars/profileAvatar";
import Styles from "./nav.module.scss";

const AfterLoginNav = ({ setConnected }) => {
  const { currentUser } = useContext(UserContext);
  const router = useRouter();
  const [zIndexNotif, setzIndexNotif] = useState(99);
  const [zIndexProfile, setzIndexProfile] = useState(99);

  const newNotifs = currentUser?.notifications.some((notif) => {
    return !notif.seen;
  });

  return (
    <div className={Styles.container_right}>
      <label
        htmlFor="bell"
        className={Styles.container_right_cercle_container}
        onClick={() => {
          if (zIndexNotif <= zIndexProfile) {
            setzIndexNotif(100);
            setzIndexProfile(99);
          }
        }}
      >
        <div
          className={[
            Styles.container_right_cercle,
            newNotifs && Styles.container_right_cercle_news,
          ].join(" ")}
        >
          <svg className={Styles.container_right_buttons}>
            <use href="/images/sprite.svg#icon-bell"></use>
          </svg>
        </div>
        <svg className={Styles.container_right_buttons_indicator}>
          <use href="/images/sprite.svg#icon-chevron-down"></use>
        </svg>
        <input
          className={Styles.container_right_cercle_container_checkbox}
          type="checkbox"
          id="bell"
        />
        <NotificationsMenu zIndexCounter={zIndexNotif} />
      </label>
      {/* <div
        className={[
          Styles.container_right_cercle,
          Styles.container_right_cercle_news,
        ].join(" ")}
      >
        <svg className={Styles.container_right_buttons}>
          <use href="/images/sprite.svg#icon-chati"></use>
        </svg>
      </div> */}
      <div
        onClick={() => router.push("/questionnaires/toAnswer")}
        htmlFor="file"
        className={Styles.container_right_cercle_container}
      >
        <div
          className={[
            Styles.container_right_cercle,
            Styles.container_right_cercle_news,
          ].join(" ")}
        >
          <svg className={Styles.container_right_buttons}>
            <use href="/images/sprite.svg#icon-file"></use>
          </svg>
        </div>
      </div>
      <label
        htmlFor="profile"
        className={Styles.container_right_cercle_container}
        onClick={() => {
          if (zIndexProfile <= zIndexNotif) {
            setzIndexProfile(100);
            setzIndexNotif(99);
          }
        }}
      >
        {/* {currentUser.avatar ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URI}${currentUser.avatar}`}
            alt="profile"
            height={50}
            width={50}
            className={Styles.container_right_cercle}
          />
        ) : (
          <Image
            src="/images/useravatarplaceholder.jpg"
            alt="profile"
            height={50}
            width={50}
            className={Styles.container_right_cercle}
          />
        )} */}

        <ProfileAvatar
          condition={!!currentUser.avatar}
          src={`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URI}${currentUser?.avatar}`}
          height={50}
          width={50}
          styleClass={Styles.container_right_cercle}
        />

        <svg className={Styles.container_right_buttons_indicator}>
          <use href="/images/sprite.svg#icon-chevron-down"></use>
        </svg>
        <input
          className={Styles.container_right_cercle_container_checkbox}
          id="profile"
          type="checkbox"
        />
        <ProfileMenuOptions
          setConnected={setConnected}
          zIndexCounter={zIndexProfile}
        />
      </label>

      <div className={Styles.container_right_search}>
        <svg className={Styles.container_right_search_icon}>
          <use href="/images/sprite.svg#icon-magnifying-glass"></use>
        </svg>
        <span className={Styles.container_right_search_text}>Search</span>
      </div>
    </div>
  );
};

export default AfterLoginNav;
