import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../../lib/queries/user";
import { GET_SKILL } from "../../lib/queries/skill";
import Layout from "../layout/layout";
import ReviewForm from "./reviewForm/reviewForm";
import Divide from "../layout/common/divide";
import Infos from "../common/review_questionnaire/infos";
import Loader from "../common/loader/loader";

const Review = () => {
  const router = useRouter();
  const { skillID, userID } = router.query;

  const componentInfoHeader = {
    img: "/images/review.png",
    title: "Skill review",
    text: "review",
  };

  const {
    data: profileUser,
    loading: loadUser,
    error: errUser,
  } = useQuery(GET_USER_PROFILE, {
    variables: { getUserProfileUserId: userID },
    onCompleted: () => {
      console.log("profile data has come FROM REVIEWING PAGE!");
    },
  });

  const {
    data: userSkill,
    loading: loadSkill,
    error: errSkill,
  } = useQuery(GET_SKILL, {
    variables: { skillSkillId: skillID },
    onCompleted: () => {
      console.log("skill data has come FROM REVIEWING PAGE!");
    },
  });

  if (errSkill || loadSkill || errUser || loadUser) {
    return <Loader layouted={true} />;
  }

  const userData = {
    id: profileUser.getUserProfile.id,
    name: profileUser.getUserProfile.name,
    surname: profileUser.getUserProfile.surname,
    avatar: profileUser.getUserProfile.avatar,
    job: profileUser.getUserProfile.domain.jobTitle,
  };

  const skillData = {
    name: userSkill.skill.name,
  };

  return (
    <Layout>
      <Divide>
        <Infos
          info={componentInfoHeader}
          skillData={skillData}
          userData={userData}
        />

        <ReviewForm
          userID={userID}
          skillID={skillID}
          userName={userData.name}
        />
      </Divide>
    </Layout>
  );
};

export default Review;
