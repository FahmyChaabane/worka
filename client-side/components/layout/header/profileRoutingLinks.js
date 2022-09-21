import { useRouter } from "next/router";
import Link from "next/link";
import Styles from "./header.module.scss";

const ProfileRoutingLinks = ({ addBorderHighlight }) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div
        style={addBorderHighlight("skillReview")}
        className={Styles.container_links_div}
      >
        <Link href={`/profile/${id}/skillReview`} passHref>
          <span>
            Skill reviews <span>(10)</span>
          </span>
        </Link>
      </div>
      <div
        style={addBorderHighlight("projects")}
        className={Styles.container_links_div}
      >
        <Link href={`/profile/${id}/projects`} passHref>
          <span>
            Projects <span>(6)</span>
          </span>
        </Link>
      </div>
      <div
        style={addBorderHighlight("about")}
        className={Styles.container_links_div}
      >
        <Link href={`/profile/${id}/about`} passHref>
          <span>About</span>
        </Link>
      </div>
      {/* <div
        style={addBorderHighlight("companies")}
        className={Styles.container_links_div}
      >
        <Link href={`/profile/${id}/companies`} passHref>
          <span className={Styles.container_links_div_relative}>
            Companies <span>(53)</span>
            <span className={Styles.container_links_div_relative_label}>
              Followed
            </span>
          </span>
        </Link>
      </div> */}
      {/* <div
        style={addBorderHighlight("peoples")}
        className={Styles.container_links_div}
      >
        <Link href={`/profile/${id}/peoples`} passHref>
          <span className={Styles.container_links_div_relative}>
            People <span>(210)</span>
            <span className={Styles.container_links_div_relative_label}>
              Close
            </span>
          </span>
        </Link>
      </div> */}
    </>
  );
};

export default ProfileRoutingLinks;
