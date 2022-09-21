import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { getPeriod } from "../../../lib/utils";
import { NotificationContext } from "../../../pages/_app";
import { SEND_REVIEW_INVITATIONS } from "../../../lib/mutations/userActions";
import { REMOVE_SKILL_FROM_USER } from "../../../lib/queries/skill";
import { UserContext } from "../../providers/userProvider";
import Button from "../../button/Button";
import Image from "next/image";
import ReviewSection from "./reviewSection";
import ReviewersImages from "./reviewersImages";
import AskInvitationPopup from "../../common/popupInvitations/askInvitationPopup";
import SkillEditPopup from "../../common/popupSkillEdit/skillEditPopup";
import handlingError from "../../../lib/handlingError";
import Styles from "./skillReview.module.scss";

const SkillElement = ({ ownSkill, userId }) => {
  const { id, globalRate, skill, seniority } = ownSkill;
  let { reviews } = ownSkill;

  const reviewerImgs = reviews.map((review) => review.reviewer.avatar);

  reviews = reviews.filter((review) => {
    return review.description;
  });
  // console.log("ownskill", reviews);

  const { setNotifyError, setNotifySuccess } = useContext(NotificationContext);
  const { currentUser } = useContext(UserContext);

  const [checkedCollapse, setCheckedCollapse] = useState(false);
  const [showAskSkillReview, setShowAskSkillReview] = useState(false);
  const [showSkillEdit, setShowSkillEdit] = useState(false);
  const router = useRouter();
  const param = router.query;

  const [sendReviewInvitationsMutation] = useMutation(SEND_REVIEW_INVITATIONS, {
    onCompleted: () => {
      console.log("FINISH!");
      setNotifySuccess({ show: true, msg: "emails sent!" });
    },
    onError: (error) => {
      handlingError(error, setNotifyError);
    },
  });

  const sendInvitations = (emails) => {
    sendReviewInvitationsMutation({
      variables: {
        sendReviewInvitationsEmailsData: {
          skillID: skill.id,
          emails,
        },
      },
    });
  };

  const [removeSkillFromUserMutation] = useMutation(REMOVE_SKILL_FROM_USER, {
    update: (cache, { data: { removeSkillFromUser } }) => {
      cache.modify({
        id: cache.identify(currentUser),
        fields: {
          skills(existingSkills = [], { readField }) {
            return existingSkills.filter((skillRef) => {
              return removeSkillFromUser.id !== readField("id", skillRef);
            });
          },
        },
      });
      cache.evict({ id: cache.identify(removeSkillFromUser) });
      cache.gc();
    },
    onCompleted: () => {
      console.log("FINISH!");
      setNotifySuccess({ show: true, msg: "Skill deleted!" });
    },
    onError: (error) => {
      handlingError(error, setNotifyError);
    },
  });

  const removeSkill = () => {
    removeSkillFromUserMutation({
      variables: {
        skillId: skill.id,
      },
    });
  };

  const rate = globalRate.length
    ? globalRate.reduce((a, b) => a + b) / globalRate.length
    : 0;

  return (
    <div
      style={{ borderBottom: "0.2rem solid #0980c6" }}
      className={Styles.frameel}
    >
      <div className={Styles.details_element}>
        <div className={Styles.details_element_left}>
          <div className={Styles.details_element_img}>
            <Image
              className={Styles.details_element_img}
              src="/images/skillplaceholder.png"
              alt="skill"
              height={80}
              width={80}
            />
          </div>
          <div>
            <span className={Styles.details_element_key}>Skill:</span>
            <h3 className={Styles.details_element_value}>{skill.name}</h3>
          </div>
        </div>
        <div className={Styles.details_element_midl}>
          <span className={Styles.details_element_key}>Seniority:</span>
          <h3 className={Styles.details_element_value}>
            {seniority ? getPeriod(seniority) : "not yet defined"}
          </h3>
        </div>
        <div className={Styles.details_element_mid}>
          <div className={Styles.details_element_mid_rating}>
            <p className={Styles.details_element_mid_rating_text}>
              <span className={Styles.details_element_mid_rating_text_value}>
                {Math.round((rate + Number.EPSILON) * 100) / 100}
              </span>
              /5
            </p>
            <div className={Styles.details_element_mid_rating_counts}>
              <ReviewersImages reviewerImgs={reviewerImgs} />
            </div>
          </div>
          <div className={Styles.details_element_mid_ratingBar}>
            <div
              style={{
                width: `${(rate * 100) / 5}%`,
              }}
            >
              <span
                className={Styles.details_element_mid_ratingBar_result}
              ></span>
            </div>
          </div>
        </div>
        <div className={Styles.details_element_midr}>
          {userId === param.id ? (
            <Button
              background="#1C1C1C"
              text="Ask for review"
              width="90%"
              fontSize="1.5rem"
              onClick={() => setShowAskSkillReview(true)}
            />
          ) : (
            <Button
              background="#1C1C1C"
              text="Review"
              width="90%"
              fontSize="1.5rem"
              onClick={() =>
                router.push(`/review?skillID=${skill.id}&userID=${param.id}`)
              }
            />
          )}
          {showAskSkillReview && (
            <AskInvitationPopup
              sendInvitations={sendInvitations}
              setShow={setShowAskSkillReview}
              footerText={
                "Please note that as soon as you have reviews on a skill you can only delete it after an admin check."
              }
            />
          )}
        </div>
        {userId === param.id && (
          <div
            className={[
              Styles.details_element_right,
              Styles.details_element_right_cercleV,
            ].join(" ")}
            onClick={() => setShowSkillEdit(!showSkillEdit)}
          >
            <svg className={Styles.details_element_right_cercle_icon}>
              <use href="/images/sprite.svg#icon-edit"></use>
            </svg>
          </div>
        )}

        {userId === param.id && (
          <div
            className={[
              Styles.details_element_right,
              Styles.details_element_right_cercleTrash,
            ].join(" ")}
            onClick={removeSkill}
          >
            <svg className={Styles.details_element_right_cercle_icon}>
              <use href="/images/sprite.svg#icon-trash"></use>
            </svg>
          </div>
        )}

        {showSkillEdit && (
          <SkillEditPopup
            skill={skill.name}
            skillID={skill.id}
            seniority={seniority}
            setShow={setShowSkillEdit}
          />
        )}
        <input
          type="checkbox"
          id={`collapse ${id}`}
          className={Styles.details_element_checkbox}
          checked={checkedCollapse}
          onChange={() => {
            setCheckedCollapse(!checkedCollapse);
          }}
        />
        <label
          htmlFor={`collapse ${id}`}
          className={Styles.details_element_right}
        >
          <div className={Styles.details_element_right_cercle}>
            <svg className={Styles.details_element_right_cercle_icon}>
              <use href="/images/sprite.svg#icon-chevron-down"></use>
            </svg>
          </div>
        </label>
      </div>
      {/* FIRST THING TO REFACTOR!! */}
      {checkedCollapse && (
        <div className={Styles.details_collapse}>
          <div className={Styles.details_collapse_content}>
            <ReviewSection reviews={reviews} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillElement;
