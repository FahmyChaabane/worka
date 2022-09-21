import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/userProvider";
import { NotificationContext } from "../../../pages/_app";
import handlingError from "../../../lib/handlingError";
import Popup from "../../layout/popup/popup";
import PopupHeader from "../../layout/popup/popupHeader";
import PopupAction from "../../layout/popup/popupAction";
import AskInvitationHeader from "./askInvitationHeader";
import AskInvitationContent from "./askInvitationContent";
import AskInvitationAction from "./askInvitationAction";
import _ from "lodash";

const AskInvitationPopup = ({ sendInvitations, setShow, footerText }) => {
  const { currentUser } = useContext(UserContext);
  const { setNotifyError } = useContext(NotificationContext);

  const [receivers, setReceivers] = useState([]);
  const [users, setUsers] = useState([]);
  const [outputList, setOutputList] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (currentUser) {
      setUsers(currentUser.followedUsers);
    }
  }, [currentUser]);

  const updateReceivers = (checked, user) => {
    setReceivers(
      checked
        ? [...receivers, user]
        : receivers.filter((e) => {
            return !_.isEqual(e, user);
          })
    );
  };

  const confirmSendEmail = () => {
    if (receivers.length === 0)
      return handlingError(
        "Would please at least select one person",
        setNotifyError
      );
    sendInvitations(receivers.map((item) => item.email));
  };

  const addManuelFakeUser = (newFakeUser) => {
    updateReceivers(true, newFakeUser.followed);
    const newArr = [...users, newFakeUser];
    setUsers(newArr);
  };

  useEffect(() => {
    const regEx = new RegExp(`.*${filter}.*`, "i");
    const matchedUsers = users.filter(
      ({ followed }) =>
        followed.name?.match(regEx) ||
        followed.surname?.match(regEx) ||
        followed.email?.match(regEx)
    );
    setOutputList(matchedUsers);
  }, [filter, users]);

  const handleChange = ({ currentTarget: input }) => {
    setFilter(input.value);
  };

  return (
    <Popup footerText={footerText}>
      <PopupHeader setClose={setShow}>
        <AskInvitationHeader
          filter={filter}
          handleChange={handleChange}
          receiversNumber={receivers.length}
        />
      </PopupHeader>
      <AskInvitationContent
        usersList={outputList}
        receivers={receivers}
        addManuelFakeUser={addManuelFakeUser}
        updateReceivers={updateReceivers}
      />
      <PopupAction setClose={setShow} action={confirmSendEmail}>
        <AskInvitationAction />
      </PopupAction>
    </Popup>
  );
};

export default AskInvitationPopup;
