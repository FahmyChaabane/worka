import Link from "next/link";
import Styles from "./header.module.scss";

const QuestionnairesRoutingLinks = ({ addBorderHighlight }) => {
  return (
    <>
      <div
        style={addBorderHighlight("toAnswer")}
        className={Styles.container_links_div}
      >
        <Link href={`/questionnaires/toAnswer`} passHref>
          <span>To Answer</span>
        </Link>
      </div>
      
      <div
        style={addBorderHighlight("toSend")}
        className={Styles.container_links_div}
      >
        <Link href={`/questionnaires/toSend`} passHref>
          <span>To Send</span>
        </Link>
      </div>
      <div
        style={addBorderHighlight("answered")}
        className={Styles.container_links_div}
      >
        <Link href={`/questionnaires/answered`} passHref>
          <span>Answered</span>
        </Link>
      </div>
    </>
  );
};

export default QuestionnairesRoutingLinks;
