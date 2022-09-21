import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useContext } from "react";
import { GET_CURRENT_USER } from "../../../lib/queries/user";
import Loader from "../../common/loader/loader";
import { UserContext } from "../../providers/userProvider";
import Styles from "./nav.module.scss";

const ProfileMenuOptions = ({ setConnected, zIndexCounter }) => {
  const { currentUser } = useContext(UserContext);
  const router = useRouter();

  const { loading, data } = useQuery(GET_CURRENT_USER, {
    onCompleted: () => {
      console.log("i am supposed to be coming from the cache");
    },
  });
  if (loading) return <Loader />;

  return (
    <div
      className={Styles.container_right_cercle_container_menu}
      style={{ zIndex: zIndexCounter }}
    >
      <div className={Styles.container_right_cercle_container_menu_profiletop}>
        Profile information : {data?.currentUser.name}{" "}
        {data?.currentUser.surname}
      </div>
      <div>
        <ul className={Styles.container_right_cercle_container_menu_profilemid}>
          <li
            className={
              Styles.container_right_cercle_container_menu_profilemid_item
            }
            onClick={() =>
              router.push(`/profile/${currentUser.id}/skillReview`)
            }
          >
            <div
              className={
                Styles.container_right_cercle_container_menu_profilemid_item_left
              }
            >
              <div
                style={{
                  background: "#0980C6",
                }}
                className={
                  Styles.container_right_cercle_container_menu_profilemid_item_logo
                }
              >
                <svg
                  className={
                    Styles.container_right_cercle_container_menu_profilemid_item_logo_img
                  }
                >
                  <use href="/images/sprite.svg#icon-star"></use>
                </svg>
              </div>
              <div
                className={
                  Styles.container_right_cercle_container_menu_profilemid_item_left_cont
                }
              >
                <p
                  className={
                    Styles.container_right_cercle_container_menu_profilemid_item_value
                  }
                >
                  Reviews
                </p>
                <p
                  className={
                    Styles.container_right_cercle_container_menu_profilemid_item_value_bold
                  }
                >
                  {`Skills & Reviews`}
                </p>
              </div>
            </div>
            <div>
              <svg
                className={
                  Styles.container_right_cercle_container_menu_profilemid_item_chevron
                }
              >
                <use href="/images/sprite.svg#icon-chevron-right"></use>
              </svg>
            </div>
          </li>
          <li
            className={
              Styles.container_right_cercle_container_menu_profilemid_item
            }
            onClick={() => router.push(`/profile/${currentUser.id}/about`)}
          >
            <div
              className={
                Styles.container_right_cercle_container_menu_profilemid_item_left
              }
            >
              <div
                style={{ background: "#7c60c7" }}
                className={
                  Styles.container_right_cercle_container_menu_profilemid_item_logo
                }
              >
                <svg
                  className={
                    Styles.container_right_cercle_container_menu_profilemid_item_logo_img
                  }
                >
                  <use href="/images/sprite.svg#icon-user"></use>
                </svg>
              </div>
              <div
                className={
                  Styles.container_right_cercle_container_menu_profilemid_item_left_cont
                }
              >
                <p
                  className={
                    Styles.container_right_cercle_container_menu_profilemid_item_value
                  }
                >
                  About
                </p>
                <p
                  className={
                    Styles.container_right_cercle_container_menu_profilemid_item_value_bold
                  }
                >
                  My Profile
                </p>
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
          {/* <li
            className={
              Styles.container_right_cercle_container_menu_profilemid_item
            }
            onClick={() => router.push("/saved/jobs")}
          >
            <div
              className={
                Styles.container_right_cercle_container_menu_profilemid_item_left
              }
            >
              <div
                style={{ background: "#FE611D" }}
                className={
                  Styles.container_right_cercle_container_menu_profilemid_item_logo
                }
              >
                <svg
                  className={
                    Styles.container_right_cercle_container_menu_profilemid_item_logo_img
                  }
                >
                  <use href="/images/sprite.svg#icon-bookmark"></use>
                </svg>
              </div>
              <div
                className={
                  Styles.container_right_cercle_container_menu_profilemid_item_left_cont
                }
              >
                <p
                  className={
                    Styles.container_right_cercle_container_menu_profilemid_item_value
                  }
                >
                  Saved
                </p>
                <p
                  className={
                    Styles.container_right_cercle_container_menu_profilemid_item_value_bold
                  }
                >
                  Jobs, companies and people
                </p>
              </div>
            </div>
            <svg
              className={
                Styles.container_right_cercle_container_menu_profilemid_item_chevron
              }
            >
              <use href="/images/sprite.svg#icon-chevron-right"></use>
            </svg>
          </li> */}
          {/* <li
            className={
              Styles.container_right_cercle_container_menu_profilemid_item
            }
            onClick={() => router.push("/jobs/applied")}
          >
            <div
              className={
                Styles.container_right_cercle_container_menu_profilemid_item_left
              }
            >
              <div
                style={{ background: "#60C7AB" }}
                className={
                  Styles.container_right_cercle_container_menu_profilemid_item_logo
                }
              >
                <svg
                  className={
                    Styles.container_right_cercle_container_menu_profilemid_item_logo_img
                  }
                >
                  <use href="/images/sprite.svg#icon-case"></use>
                </svg>
              </div>
              <div
                className={
                  Styles.container_right_cercle_container_menu_profilemid_item_left_cont
                }
              >
                <p
                  className={
                    Styles.container_right_cercle_container_menu_profilemid_item_value
                  }
                >
                  Jobs
                </p>
                <p
                  className={
                    Styles.container_right_cercle_container_menu_profilemid_item_value_bold
                  }
                >
                  Job you have already applied in
                </p>
              </div>
            </div>
            <svg
              className={
                Styles.container_right_cercle_container_menu_profilemid_item_chevron
              }
            >
              <use href="/images/sprite.svg#icon-chevron-right"></use>
            </svg>
          </li> */}
        </ul>
      </div>
      <div>
        <ul
          className={Styles.container_right_cercle_container_menu_profilebottom}
        >
          <li
            className={
              Styles.container_right_cercle_container_menu_profilebottom_item
            }
            onClick={() => router.push("/settings")}
          >
            My settings
          </li>
          <li
            className={
              Styles.container_right_cercle_container_menu_profilebottom_item
            }
            onClick={() => router.push("/contact")}
          >
            Contact support
          </li>
          <li
            className={
              Styles.container_right_cercle_container_menu_profilebottom_item
            }
            onClick={() => {
              setConnected(false);
              fetch(new URL("api/logout", process.env.NEXT_PUBLIC_SELF_HOST), {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              return router.push("/login");
            }}
          >
            Log out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileMenuOptions;
