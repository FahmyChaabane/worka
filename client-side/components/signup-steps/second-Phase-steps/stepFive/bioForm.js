import Styles from "../steps.module.scss";
import Draft from "../../../common/draft/draft";

const BioForm = ({ bio, bio2, setBioForm, setBio2Form, errorb1, errorb2 }) => {
  const handleChange = ({ currentTarget: input }) => {
    // _.set(bioObj, input.name, input.value);
    setBioForm(input.value);
  };

  return (
    <div
      className={[
        Styles.layout,
        // errorb1 ||
        errorb2 ? Styles.layout_invalidborder : Styles.layout_validborder,
      ].join(" ")}
    >
      <div className={Styles.layout_inside}>
        {/* <div
          className={Styles.layout_inside_questionsGrid_questionItem_textArea}
        >
          <textarea
            className={Styles.layout_inside_styledTextArea}
            placeholder="Bio..."
            name="bio"
            value={bio}
            onChange={handleChange}
          />
        </div>
        {errorb1 && (
          <div className={Styles.layout_inside_questionsGrid_error}>
            {errorb1}
          </div>
        )} */}
        <Draft
          editorState={bio2}
          setBio2Form={setBio2Form}
          placeholder="My bio..."
        />
        {errorb2 && (
          <div className={Styles.layout_inside_questionsGrid_error}>
            {errorb2}
          </div>
        )}
      </div>
    </div>
  );
};

export default BioForm;
