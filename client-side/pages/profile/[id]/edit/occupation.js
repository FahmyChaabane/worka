import withAuthServerSideProps, {
  amICompleted,
} from "../../../../lib/withAuth";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../components/providers/userProvider";
import { removeTypename } from "../../../../lib/mutationDTOs";
import Occupation from "../../../../components/profile/edit/occupation";

export const FormOccupationContext = createContext();
export const FormOccupationEditErrorContext = createContext();

const EditOccupation = () => {
  const { currentUser } = useContext(UserContext);
  const [formOccupation, setFormOccupation] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    setFormOccupation(removeTypename(currentUser?.work));
  }, [currentUser]);

  return (
    <FormOccupationContext.Provider
      value={{ formOccupation, setFormOccupation }}
    >
      <FormOccupationEditErrorContext.Provider value={{ error, setError }}>
        <Occupation />
      </FormOccupationEditErrorContext.Provider>
    </FormOccupationContext.Provider>
  );
};

export default amICompleted(EditOccupation);
export const getServerSideProps = withAuthServerSideProps();
