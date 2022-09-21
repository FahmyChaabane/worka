import withAuthServerSideProps, {
  amICompleted,
} from "../../../../lib/withAuth";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../components/providers/userProvider";
import { removeTypename } from "../../../../lib/mutationDTOs";
import Education from "../../../../components/profile/edit/education";

export const FormEducationContext = createContext();
export const FormEducationEditErrorContext = createContext();

const EditEducation = () => {
  const { currentUser } = useContext(UserContext);
  const [formEducation, setFormEducation] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    setFormEducation(removeTypename(currentUser?.education));
  }, [currentUser]);

  return (
    <FormEducationContext.Provider value={{ formEducation, setFormEducation }}>
      <FormEducationEditErrorContext.Provider value={{ error, setError }}>
        <Education />
      </FormEducationEditErrorContext.Provider>
    </FormEducationContext.Provider>
  );
};

export default amICompleted(EditEducation);
export const getServerSideProps = withAuthServerSideProps();
