import withAuthServerSideProps, {
  amICompleted,
} from "../../../../lib/withAuth";
import { createContext, useContext, useEffect, useState } from "react";
import { convertFromRaw, EditorState } from "draft-js";
import { UserContext } from "../../../../components/providers/userProvider";
import { removeTypename } from "../../../../lib/mutationDTOs";
import About from "../../../../components/profile/edit/about";
import _ from "lodash";

export const FormAboutContext = createContext();
export const FormAboutEditErrorContext = createContext();

const EditAbout = () => {
  const { currentUser } = useContext(UserContext);
  const [formAbout, setFormAbout] = useState({});
  const [error, setError] = useState([]);

  useEffect(() => {
    if (currentUser)
      setFormAbout(
        _.update(
          removeTypename(
            _.pick(currentUser, [
              "name",
              "surname",
              "gender",
              "location",
              "born",
              "domain",
              "phoneNumber",
              "avatar",
              // "bio",
              "bio2",
            ])
          ),
          ["bio2"],
          (item) => {
            return EditorState.createWithContent(
              convertFromRaw(JSON.parse(item))
            );
          }
        )
      );
  }, [currentUser]);

  return (
    <FormAboutContext.Provider value={{ formAbout, setFormAbout }}>
      <FormAboutEditErrorContext.Provider value={{ error, setError }}>
        <About />
      </FormAboutEditErrorContext.Provider>
    </FormAboutContext.Provider>
  );
};

export default amICompleted(EditAbout);
export const getServerSideProps = withAuthServerSideProps();
