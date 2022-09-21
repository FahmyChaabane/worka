import { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../providers/userProvider";
import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../../../lib/queries/user";
import BasicInformations from "./basicInfomations";
import Description from "./description";
import WorkExperienceElement from "./WorkExperienceElement";
import EducationExperienceElement from "./educationExperienceElement";
import Layout from "../../layout/layout";
import Header from "../../layout/header/header";
import Styles from "./about.module.scss";
// import { convertFromRaw, Editor, EditorState } from "draft-js";

const About = () => {
  const { currentUser } = useContext(UserContext);
  const router = useRouter();
  const { id } = router.query;

  const { data: profileUser } = useQuery(GET_USER_PROFILE, {
    variables: { getUserProfileUserId: id },
    onCompleted: () => {
      console.log("profile data has come FROM ABOUT!");
    },
  });

  return (
    <Layout>
      <Header>
        <section className={Styles.container}>
          <BasicInformations
            other={id === currentUser?.id}
            location={profileUser?.getUserProfile.location}
            born={profileUser?.getUserProfile.born}
            email={profileUser?.getUserProfile.email}
          />
          <div className={Styles.details}>
            <p className={Styles.details_title}>Description:</p>
            <Description
              other={id === currentUser?.id}
              bio={profileUser?.getUserProfile.bio}
              bio2={profileUser?.getUserProfile.bio2}
            />
          </div>
          <div className={Styles.details}>
            <p className={Styles.details_title}>Work experience:</p>
            <div
              className={
                id === currentUser?.id ? Styles.frame : Styles.frameother
              }
            >
              {profileUser?.getUserProfile.work.map((workexp, index) => (
                <WorkExperienceElement key={index} workexp={workexp} />
              ))}
            </div>

            <p className={Styles.details_title}>Education:</p>
            <div
              className={
                id === currentUser?.id ? Styles.frame : Styles.frameother
              }
            >
              {profileUser?.getUserProfile.education.map((eduexp, index) => (
                <EducationExperienceElement key={index} eduexp={eduexp} />
              ))}
            </div>
          </div>
        </section>
      </Header>
    </Layout>
  );
};

export default About;
