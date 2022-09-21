import { convertFromRaw, Editor, EditorState } from "draft-js";
import { useEffect, useState } from "react";
import Styles from "./about.module.scss";

const Description = ({ other, bio, bio2 }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    if (bio2) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(bio2)))
      );
    }
  }, [bio2]);

  return (
    <>
      {/* <div
        className={[
          Styles.details_text,
          other ? Styles.frame : Styles.frameother,
        ].join(" ")}
      >
        {bio}
      </div> */}
      <div
        className={[
          Styles.details_text,
          other ? Styles.frame : Styles.frameother,
        ].join(" ")}
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          readOnly={true}
        />
      </div>
    </>
  );
};

export default Description;
