import { useState } from "react";
import Popup from "../../layout/popup/popup";
import PopupHeader from "../../layout/popup/popupHeader";
import PopupAction from "../../layout/popup/popupAction";
import AskQuestionHeader from "./askQuestionHeader";
import Button from "../../button/Button";
import Styles from "./questionsAnswers.module.scss";
import AskQuestionContent from "./askQuestionContent";
import AskQuestionAction from "./askQuestionAction";

const QANav = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className={Styles.informations_nav}>
      <div className={Styles.informations_nav_left}>
        <p className={Styles.informations_nav_key}>
          Questions and Answers about Heroku:
        </p>
        <p className={Styles.informations_nav_value}>
          Search questions by keywords or add your own if you could not find
          what you are looking for
        </p>
      </div>
      <div className={Styles.informations_nav_right}>
        {/* <div className={Styles.informations_nav_right_btn}>Ask question</div> */}
        <Button
          text="Ask a question"
          background="#5ed18c"
          width="23rem"
          onClick={() => setChecked(!checked)}
        />
        <div className={Styles.informations_nav_select}>
          <span className={Styles.informations_nav_value}>Sort by:</span>
          <select className={Styles.informations_nav_selection}>
            <option>Date added</option>
            <option>99999</option>
            <option>99999</option>
            <option>99999</option>
          </select>
        </div>
      </div>
      {checked && (
        <Popup
          footerText={
            "Please note that your questions will be public and anyone can view them."
          }
        >
          <PopupHeader setClose={setChecked}>
            <AskQuestionHeader />
          </PopupHeader>
          <AskQuestionContent />
          <PopupAction>
            <AskQuestionAction />
          </PopupAction>
        </Popup>
      )}
    </div>
  );
};

export default QANav;
