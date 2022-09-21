import Layout from "../../../layout/layout";
import Divide from "../../../layout/common/divide";
import Styles from "./create.module.scss";
import Input from "../../../input/InputText";
import Image from "next/image";
import RadioBox from "../../../input/radiobox";

const CreateProject = () => {
  return (
    <Layout>
      <Divide>
        <div className={Styles.nav}>
          <div className={Styles.nav_container}>
            <div className={Styles.nav_container_frame}>
              <label
                htmlFor="name"
                className={Styles.nav_container_frame_subHeading}
              >
                Project name:
              </label>
              <Input
                id="name"
                style={{
                  background: "transparent",
                  padding: "0",
                  border: "none",
                  height: "2.5rem",
                }}
                placeholder="Write your project name"
              />
            </div>

            <div className={Styles.nav_container_frame}>
              <label
                htmlFor="about"
                className={Styles.nav_container_frame_subHeading}
              >
                Subheading:
              </label>
              <Input
                id="about"
                style={{
                  background: "transparent",
                  padding: "0",
                  border: "none",
                  height: "2.5rem",
                }}
                placeholder="About this project"
              />
            </div>
            <div className={Styles.nav_container_frame}>
              <label className={Styles.nav_container_frame_subHeading}>
                Add coworkers to your project:
              </label>
              <div className={Styles.nav_container_frame_input}>
                <Input
                  placeholder="Write name or e-mail"
                  style={{
                    padding: "1rem",
                    height: "4rem",
                  }}
                />
                <svg className={Styles.nav_container_frame_input_icon}>
                  <use href="/images/sprite.svg#icon-enter"></use>
                </svg>
              </div>
              <span className={Styles.nav_container_frame_subHeading}>
                Users:
              </span>
              <ul className={Styles.nav_container_frame_list}>
                <li className={Styles.nav_container_frame_list_item}>
                  <div className={Styles.nav_container_frame_list_item_flex}>
                    <div className={Styles.nav_container_frame_list_item_mgn}>
                      <Image
                        src="/images/jhon.jpeg"
                        width={40}
                        height={40}
                        alt="user"
                        className={Styles.nav_container_frame_list_item_img}
                      />
                    </div>
                    <span className={Styles.nav_container_frame_list_item_name}>
                      {" "}
                      Jhon Abruzzi{" "}
                    </span>
                  </div>
                  <RadioBox _id="gender1" name="user" fontSize="1.5rem" />
                </li>
                <li className={Styles.nav_container_frame_list_item}>
                  <div className={Styles.nav_container_frame_list_item_flex}>
                    <div className={Styles.nav_container_frame_list_item_mgn}>
                      <Image
                        src="/images/ron.jpeg"
                        width={40}
                        height={40}
                        alt="user"
                        className={Styles.nav_container_frame_list_item_img}
                      />
                    </div>
                    <span className={Styles.nav_container_frame_list_item_name}>
                      {" "}
                      Micheal Scofield{" "}
                    </span>
                  </div>
                  <RadioBox _id="gender2" name="user" fontSize="1.5rem" />
                </li>
                <li className={Styles.nav_container_frame_list_item}>
                  <div className={Styles.nav_container_frame_list_item_flex}>
                    <div className={Styles.nav_container_frame_list_item_mgn}>
                      <Image
                        src="/images/harmion.jpeg"
                        width={40}
                        height={40}
                        alt="user"
                        className={Styles.nav_container_frame_list_item_img}
                      />
                    </div>
                    <span className={Styles.nav_container_frame_list_item_name}>
                      {" "}
                      Linkin Buruz{" "}
                    </span>
                  </div>
                  <RadioBox _id="gender3" name="user" fontSize="1.5rem" />
                </li>
                <li className={Styles.nav_container_frame_list_item}>
                  <div className={Styles.nav_container_frame_list_item_flex}>
                    <div className={Styles.nav_container_frame_list_item_mgn}>
                      <Image
                        src="/images/jhon.jpeg"
                        width={40}
                        height={40}
                        alt="user"
                        className={Styles.nav_container_frame_list_item_img}
                      />
                    </div>
                    <span className={Styles.nav_container_frame_list_item_name}>
                      {" "}
                      Alexandre Mahone{" "}
                    </span>
                  </div>
                  <RadioBox _id="gender4" name="user" fontSize="1.5rem" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>project type</div>
      </Divide>
    </Layout>
  );
};

export default CreateProject;
