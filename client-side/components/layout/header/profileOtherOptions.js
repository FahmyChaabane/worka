import { useMutation, useQuery } from "@apollo/client";
import { FOLLOW_USER, UNFOLLOW_USER } from "../../../lib/mutations/userActions";
import { GET_CURRENT_USER } from "../../../lib/queries/user";
import { useContext } from "react";
import { NotificationContext } from "../../../pages/_app";
import { UserContext } from "../../providers/userProvider";
import { gql } from "@apollo/client";
import _ from "lodash";
import handlingError from "../../../lib/handlingError";
import Styles from "./header.module.scss";

const ProfileOtherOptions = ({ profileID }) => {
  const { setNotifyError, setNotifySuccess } = useContext(NotificationContext);
  // const { currentUser } = useContext(UserContext);
  const { data } = useQuery(GET_CURRENT_USER);

  const [followUserMutation] = useMutation(FOLLOW_USER, {
    update: (cache, { data: { followUser } }) => {
      cache.modify({
        id: cache.identify(data?.currentUser),
        fields: {
          followedUsers(existingFollowedUsers = []) {
            const newFollowedUserRef = cache.writeQuery({
              // specify the root object, default is ROOT_QUERY
              id: cache.identify(followUser), // sth like, return back the right ref
              // can be looked at as if you're querying it (the new added one) back after submitting it into the DB
              query: gql`
                query WriteFollowedUser {
                  id
                  followed {
                    id
                  }
                }
              `,
              data: followUser,
            });
            return [...existingFollowedUsers, newFollowedUserRef];
          },
        },
      });
    },
    onCompleted: () => {
      setNotifySuccess({ show: true, msg: "user followed!" });
    },
    onError: (error) => {
      handlingError(error, setNotifyError);
    },
  });

  const [unfollowUserMutation] = useMutation(UNFOLLOW_USER, {
    update: (cache, { data: { unfollowUser } }) => {
      console.log("unfollowUser:   ", unfollowUser.id);
      cache.modify({
        id: cache.identify(data?.currentUser),
        fields: {
          followedUsers(existingFollowedUsers = [], { readField }) {
            return existingFollowedUsers.filter((followUserRef) => {
              return unfollowUser.id !== readField("id", followUserRef);
            });
          },
        },
      });

      cache.evict({ id: cache.identify(unfollowUser) });
      cache.gc();
    },
    onCompleted: () => {
      setNotifySuccess({ show: true, msg: "user unfollowed!" });
    },
    onError: (error) => {
      handlingError(error, setNotifyError);
    },
  });

  const followUser = () => {
    followUserMutation({
      variables: {
        followUserProfileId: profileID,
      },
    });
  };

  const unfollowUser = () => {
    unfollowUserMutation({
      variables: {
        unfollowUserProfileId: profileID,
      },
    });
  };

  const isFollowable = _.find(data?.currentUser.followedUsers, [
    "followed.id",
    profileID,
  ]);
  console.log("isFollowable", data?.currentUser.followedUsers.length);

  return (
    <div
      className={[
        Styles.container_header_options,
        Styles.container_header_options_other,
      ].join(" ")}
    >
      <div
        className={[
          Styles.container_header_options_other_msg,
          Styles.container_header_options_common,
        ].join(" ")}
      >
        <span>
          <svg className={Styles.container_header_options_logo}>
            <use href="/images/sprite.svg#icon-chati"></use>
          </svg>
        </span>
        <span>Message</span>
      </div>
      {!isFollowable ? (
        <div
          className={[
            Styles.container_header_options_suggestions,
            Styles.container_header_options_common,
          ].join(" ")}
          onClick={followUser}
        >
          <span>
            <svg className={Styles.container_header_options_logo}>
              <use href="/images/sprite.svg#icon-users"></use>
            </svg>
          </span>
          <span>I know this user</span>
        </div>
      ) : (
        <div
          className={[
            Styles.container_header_options_suggestionsunflw,
            Styles.container_header_options_common,
          ].join(" ")}
          onClick={unfollowUser}
        >
          <span>
            <svg className={Styles.container_header_options_logo}>
              <use href="/images/sprite.svg#icon-users"></use>
            </svg>
          </span>
          <span>Unfollow this user</span>
        </div>
      )}
      <div className={Styles.container_header_options_other_edit}>
        <span>
          <svg className={Styles.container_header_options_other_edit_logo}>
            <use href="/images/sprite.svg#icon-options"></use>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default ProfileOtherOptions;
