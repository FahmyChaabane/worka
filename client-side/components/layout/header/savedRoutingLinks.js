import Link from "next/link";
import Styles from "./header.module.scss";

const SavedRoutingLinks = ({ addBorderHighlight }) => {
  return (
    <>
      <div
        style={addBorderHighlight("jobs")}
        className={Styles.container_links_div}
      >
        <Link href="/saved/jobs" passHref>
          <span>
            Jobs <span>(6)</span>
          </span>
        </Link>
      </div>

      <div
        style={addBorderHighlight("companies")}
        className={Styles.container_links_div}
      >
        <Link href="/saved/companies" passHref>
          <span>
            Companies <span>(12)</span>
          </span>
        </Link>
      </div>
    </>
  );
};

export default SavedRoutingLinks;
