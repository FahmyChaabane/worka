import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { useContext } from "react";
// import { UserContext } from "../../providers/userProvider";
import { NotificationContext } from "../../../pages/_app";
import { SUBMIT_SEE_NOIFICATION } from "../../../lib/mutations/userActions";
import { GET_CURRENT_USER } from "../../../lib/queries/user";
import handlingError from "../../../lib/handlingError";
import moment from "moment";
import ProfileAvatar from "../../common/avatars/profileAvatar";
// import Image from "next/image";
import Styles from "./nav.module.scss";

const NotificationsMenu = ({ zIndexCounter }) => {
  // const { currentUser } = useContext(UserContext);
  const { data, fetchMore } = useQuery(GET_CURRENT_USER, {
    variables: {
      offset: 0,
      limit: 5,
    },
  });
  const { setNotifyError } = useContext(NotificationContext);
  const router = useRouter();

  // console.log("currentUser notifications", currentUser.notifications);

  const [submitSeeNotificationMutation] = useMutation(SUBMIT_SEE_NOIFICATION, {
    onCompleted: () => {
      console.log("FINISH!");
    },
    onError: (error) => {
      handlingError(error, setNotifyError);
    },
  });

  const triggerNotification = (route, id, isSeen) => {
    if (!isSeen) {
      submitSeeNotificationMutation({
        variables: {
          markAsSeenNotificationNotificationId: id,
        },
      });
    }
    router.push(route);
  };

  return (
    <div
      className={Styles.container_right_cercle_container_menu}
      style={{ zIndex: zIndexCounter }}
    >
      <div>
        <ul
          className={[
            Styles.container_right_cercle_container_menu_profilemid,
            Styles.container_right_cercle_container_menu_profilemid_estlen,
          ].join(" ")}
        >
          {data?.currentUser.notifications.length !== 0 ? (
            data.currentUser.notifications.map((notif) => {
              const { id, route, text, dispatcher, seen, createdAt } = notif;
              return (
                <li
                  className={[
                    Styles.container_right_cercle_container_menu_profilemid_item,
                    seen
                      ? Styles.container_right_cercle_container_menu_profilemid_item_seen
                      : Styles.container_right_cercle_container_menu_profilemid_item_unseen,
                  ].join(" ")}
                  key={id}
                  onClick={() => triggerNotification(route, id, seen)}
                >
                  <div
                    className={
                      Styles.container_right_cercle_container_menu_profilemid_item_left
                    }
                  >
                    <div
                      className={
                        Styles.container_right_cercle_container_menu_profilemid_item_logo
                      }
                    >
                      {/* <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URI}${dispatcher.avatar}`}
                        height={40}
                        width={40}
                        className={
                          Styles.container_right_cercle_container_menu_profilemid_item_dispatcher
                        }
                      /> */}
                      <ProfileAvatar
                        condition={!!dispatcher.avatar}
                        src={`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URI}${dispatcher.avatar}`}
                        height={40}
                        width={40}
                        styleClass={
                          Styles.container_right_cercle_container_menu_profilemid_item_dispatcher
                        }
                      />
                    </div>
                    <div
                      className={
                        Styles.container_right_cercle_container_menu_profilemid_item_left_cont
                      }
                    >
                      <p
                        className={
                          seen
                            ? Styles.container_right_cercle_container_menu_profilemid_item_value
                            : Styles.container_right_cercle_container_menu_profilemid_item_value_bold
                        }
                      >
                        {text}
                      </p>
                    </div>
                    <div
                      className={
                        Styles.container_right_cercle_container_menu_profilemid_item_left_timing
                      }
                    >
                      {moment(createdAt).fromNow()}
                    </div>
                  </div>
                  <svg
                    className={
                      Styles.container_right_cercle_container_menu_profilemid_item_chevron
                    }
                  >
                    <use href="/images/sprite.svg#icon-chevron-right"></use>
                  </svg>
                </li>
              );
            })
          ) : (
            <p
              className={
                Styles.container_right_cercle_container_menu_profilemid_item_value
              }
            >
              no notifications
            </p>
          )}
        </ul>
        <div
          className={
            Styles.container_right_cercle_container_menu_profilemid_loadmore
          }
        >
          <button
            className={
              Styles.container_right_cercle_container_menu_profilemid_loadmore_btn
            }
            onClick={() =>
              fetchMore({
                variables: {
                  offset: data.currentUser.notifications.length,
                },
              })
            }
          >
            load more
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsMenu;
