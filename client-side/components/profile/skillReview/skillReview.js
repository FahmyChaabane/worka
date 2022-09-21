import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../providers/userProvider";
import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../../../lib/queries/user";
import SkillElement from "./skillElement";
import SkillSearch from "./skillSearch";
import Layout from "../../layout/layout";
import Header from "../../layout/header/header";
import Styles from "./skillReview.module.scss";

const SkillReview = () => {
  const { currentUser } = useContext(UserContext);
  const router = useRouter();
  const { id } = router.query;

  const { data: profileUser } = useQuery(GET_USER_PROFILE, {
    variables: { getUserProfileUserId: id },
    onCompleted: () => {
      console.log("profile data has come FROM SKILLREVIEW!");
    },
  });

  return (
    <Layout>
      <Header>
        <section className={Styles.container}>
          {id === currentUser?.id && <SkillSearch />}

          <div className={Styles.details}>
            {id === currentUser?.id && (
              <div className={Styles.details_head}>
                <span className={Styles.details_head_title}>Your Skills:</span>
                <span className={Styles.details_head_edit}>Edit skills</span>
              </div>
            )}

            {profileUser?.getUserProfile.skills.map((item) => (
              <SkillElement
                key={item.id}
                ownSkill={item}
                userId={currentUser?.id}
              />
            ))}
          </div>
        </section>
      </Header>
    </Layout>
  );
};

export default SkillReview;
