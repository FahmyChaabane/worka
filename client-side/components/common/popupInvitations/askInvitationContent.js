import { useState } from "react";
import { validateV } from "../../../lib/inputsValidation";
import Joi from "joi";
import AskInvitationContentListItem from "./askInvitationContentListItem";
import Styles from "./popupInvitation.module.scss";

const emailSchema = Joi.object({
  emailInput: Joi.string().email({ tlds: false }).messages({
    "string.email": "email field must be a valid email!",
  }),
});

const checked = {
  elemetList: { background: "#E4F1F9" },
  checkCircle: { background: "#0980c6" },
  checkMark: { fill: "#FFFF" },
};
const unchecked = {
  elemetList: { background: "" },
  checkCircle: { background: "" },
  checkMark: { fill: "" },
};

const AskInvitationContent = ({
  usersList,
  receivers,
  addManuelFakeUser,
  updateReceivers,
}) => {
  const [emailInput, setEmailInput] = useState("");
  const [error, setError] = useState([]);

  const handleChange = ({ currentTarget: input }) => {
    setEmailInput(input.value);
  };

  const addEmail = async (e) => {
    e.preventDefault();

    const errors = await validateV(emailSchema, { emailInput });
    setError(errors || []);
    if (errors.length !== 0) {
      return;
    }
    console.log("email added");
    setEmailInput("");
    addManuelFakeUser({
      followed: { email: emailInput, specialEntrance: true },
    });
  };

  return (
    <>
      <div className={Styles.popupContent}>
        <div className={Styles.popupContent_logo}>
          <svg className={Styles.popupContent_logo_img}>
            <use href="/images/sprite.svg#icon-mail"></use>
          </svg>
        </div>
        <div className={Styles.popupContent_mid}>
          <p className={Styles.popupContent_mid_req}>
            Send invitation via mail:
          </p>
          <form onSubmit={addEmail}>
            <input
              type="text"
              className={Styles.popupContent_mid_input}
              placeholder="Write email here and press enter."
              value={emailInput}
              onChange={handleChange}
            />
            {_.get(error[0], "emailInput") && (
              <div className={Styles.popupContent_mid_input_error}>
                {error[0].emailInput}
              </div>
            )}
          </form>
        </div>
        <div>
          <svg className={Styles.popupContent_mid_enter}>
            <use href="/images/sprite.svg#icon-enter"></use>
          </svg>
        </div>
      </div>
      <div className={Styles.popupContent_listContainer}>
        <nav className={Styles.popupContent_listContainer_list}>
          {usersList.map((item, index) => (
            <AskInvitationContentListItem
              key={index}
              user={item.followed}
              picked={receivers.includes(item.followed)}
              styles={receivers.includes(item.followed) ? checked : unchecked}
              updateReceivers={updateReceivers}
            />
          ))}
        </nav>
      </div>
    </>
  );
};

export default AskInvitationContent;
