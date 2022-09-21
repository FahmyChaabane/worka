import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../providers/userProvider";
import ProfileMyOptions from "./profileMyOptions";
import ProfileOtherOptions from "./profileOtherOptions";

const ProfileOptions = () => {
  const { currentUser } = useContext(UserContext);
  const router = useRouter();
  const { id } = router.query;

  return id === currentUser?.id ? (
    <ProfileMyOptions
      questionCount={currentUser.toBeAnsweredQuestions.length}
    />
  ) : (
    <ProfileOtherOptions profileID={id} />
  );
};

export default ProfileOptions;
