import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { NotificationContext } from "../../../pages/_app";
import { EDIT_SKILL_SENIORITY } from "../../../lib/queries/skill";
import handlingError from "../../../lib/handlingError";
import Popup from "../../layout/popup/popup";
import PopupHeader from "../../layout/popup/popupHeader";
import PopupAction from "../../layout/popup/popupAction";
import SkillEditPopupAction from "./skillEditPopupAction";
import SkillEditPopupContent from "./skillEditPopupContent";
import SkillEditPopupHeader from "./skillEditPopupHeader";

const SkillEditPopup = ({ skill, skillID, seniority, setShow }) => {
  const [period, setPeriod] = useState(seniority ? seniority : 0);
  const { setNotifyError, setNotifySuccess } = useContext(NotificationContext);

  // console.log("HIT", skillID);

  const incrementPeriod = () => {
    setPeriod(period + 1);
  };

  const decrementPeriod = () => {
    if (period > 0) setPeriod(period - 1);
  };

  const [editSkillSeniorityMutation] = useMutation(EDIT_SKILL_SENIORITY, {
    onCompleted: () => {
      console.log("FINISH!");
      setNotifySuccess({ show: true, msg: "Seniority updated!" });
    },
    onError: (error) => {
      handlingError(error, setNotifyError);
    },
  });

  const confirmEdit = () => {
    editSkillSeniorityMutation({
      variables: {
        editSkillSeniorityData: { skillID, seniority: period },
      },
    });
  };

  return (
    <Popup
      footerText={
        "Please note that as soon as you have reviews on a skill you can only delete it after an admin check."
      }
    >
      <PopupHeader setClose={setShow}>
        <SkillEditPopupHeader />
      </PopupHeader>
      <SkillEditPopupContent
        skill={skill}
        period={period}
        incrementPeriod={incrementPeriod}
        decrementPeriod={decrementPeriod}
      />
      <PopupAction action={confirmEdit} setClose={setShow}>
        <SkillEditPopupAction />
      </PopupAction>
    </Popup>
  );
};

export default SkillEditPopup;
