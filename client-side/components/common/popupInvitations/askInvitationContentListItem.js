import { useState } from "react";
import ProfileAvatar from "../avatars/profileAvatar";
import Styles from "./popupInvitation.module.scss";

const AskInvitationContentListItem = ({
  user,
  picked,
  styles,
  updateReceivers,
}) => {
  const [check, setCheck] = useState(picked);

  // useEffect(() => {
  //   if (check) {
  //     updateReceivers(true, user);
  //     // setStyles(checked);
  //     return;
  //   }

  //   updateReceivers(false, user);
  //   // setStyles(unchecked);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [check]);

  const handleClick = () => {
    if (!check) {
      updateReceivers(true, user);
    } else {
      updateReceivers(false, user);
    }
    setCheck(!check);
  };

  return (
    <li
      onClick={handleClick}
      style={styles.elemetList}
      className={Styles.popupContent_listContainer_list_item}
    >
      {user.specialEntrance ? (
        <div className={Styles.popupContent_logo}>
          <svg className={Styles.popupContent_logo_img}>
            <use href="/images/sprite.svg#icon-mail"></use>
          </svg>
        </div>
      ) : (
        // <Image
        //   src={`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URI}${user.avatar}`}
        //   alt="user"
        //   className={Styles.popupContent_listContainer_list_item_img}
        //   width={60}
        //   height={60}
        //   />
        <ProfileAvatar
          condition={!!user.avatar}
          src={`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URI}${user.avatar}`}
          height={60}
          width={60}
          styleClass={Styles.popupContent_listContainer_list_item_img}
        />
      )}
      <div className={Styles.popupContent_mid}>
        <p className={Styles.popupContent_listContainer_list_item_name}>
          {user.specialEntrance ? (
            "Mail"
          ) : (
            <>
              {user.name} {user.surname}
            </>
          )}
        </p>
        <p className={Styles.popupContent_listContainer_list_item_mail}>
          {user.email}
        </p>
      </div>
      <div
        className={Styles.popupContent_listContainer_list_item_checkcontainer}
        style={styles.checkCircle}
      >
        <svg
          className={
            Styles.popupContent_listContainer_list_item_checkcontainer_check
          }
          style={styles.checkMark}
        >
          <use href="/images/sprite.svg#icon-check"></use>
        </svg>
      </div>
    </li>
  );
};

export default AskInvitationContentListItem;
