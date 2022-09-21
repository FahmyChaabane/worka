import Styles from "./popupInvitation.module.scss";
import Image from "next/image";

const AskInvitationHeader = ({ filter, handleChange, receiversNumber }) => {
  return (
    <>
      <div className={Styles.popupHeader}>
        <div className={Styles.popupHeader_img_mgn}>
          <Image
            src="/images/questionnaire.png"
            alt="question"
            className={Styles.popupHeader_img}
            height={80}
            width={80}
          />
        </div>
        <div>
          <h3 className={Styles.popupHeader_title}>Send request</h3>
          <p className={Styles.popupHeader_text}>
            You can send this to people in or outside of worka, yet only send to
            people that you know best.
          </p>
        </div>
      </div>
      <div className={Styles.popupHeader_search}>
        <input
          type="text"
          className={Styles.popupHeader_search_input}
          placeholder="Filter by name, email or keywords..."
          value={filter}
          onChange={handleChange}
        />
        <button className={Styles.popupHeader_search_btn}>Search</button>
        <span className={Styles.popupHeader_search_selected}>
          Selected(<span>{receiversNumber}</span>)
        </span>
      </div>
    </>
  );
};

export default AskInvitationHeader;
