import { useRef } from "react";
import Editor from "@draft-js-plugins/editor";
import createEmojiPlugin from "@draft-js-plugins/emoji";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import createToolbarPlugin, {
  Separator,
} from "@draft-js-plugins/static-toolbar";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
} from "@draft-js-plugins/buttons";
import Styles from "./draft.module.scss";
import "draft-js/dist/Draft.css";
import "@draft-js-plugins/emoji/lib/plugin.css";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import "@draft-js-plugins/linkify/lib/plugin.css";

const emojiPlugin = createEmojiPlugin();
const staticToolbarPlugin = createToolbarPlugin();
const linkifyPlugin = createLinkifyPlugin();
const plugins = [staticToolbarPlugin, emojiPlugin, linkifyPlugin];
const { EmojiSelect } = emojiPlugin;
const { Toolbar } = staticToolbarPlugin;

const Draft = ({ editorState, setBio2Form, placeholder }) => {
  const editorRef = useRef(null);

  const handleChange = (editorState) => {
    setBio2Form(editorState, "from handleChange");
  };

  function myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    // console.log("type", type);
    if (type === "blockquote") {
      return Styles.superFancyBlockquote;
    }
    return Styles.default;
  }

  if (!editorState || typeof editorState === "string")
    return <div>Loading content...</div>;

  return (
    <div
      className={Styles.editor}
      onClick={() => editorRef.current && editorRef.current.focus()}
    >
      <Editor
        ref={(editor) => (editorRef.current = editor)}
        editorState={editorState}
        onChange={handleChange}
        plugins={plugins}
        placeholder={placeholder}
        blockStyleFn={myBlockStyleFn}
      />

      {editorRef && (
        <div className={Styles.editor_emoji}>
          <EmojiSelect />
        </div>
      )}

      {editorRef && (
        <Toolbar>
          {
            // may be use React.Fragment instead of div to improve perfomance after React 16
            (externalProps) => (
              <>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <CodeButton {...externalProps} />
                <Separator {...externalProps} />
                <HeadlineOneButton {...externalProps} />
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <BlockquoteButton {...externalProps} />
              </>
            )
          }
        </Toolbar>
      )}
    </div>
  );
};
export default Draft;
