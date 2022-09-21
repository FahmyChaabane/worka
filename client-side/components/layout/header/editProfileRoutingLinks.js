import { useRouter } from "next/router";
import Link from "next/link";
import Styles from "./header.module.scss";

const EditProfileRoutingLinks = ({ addBorderHighlight }) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div
        style={addBorderHighlight("about")}
        className={Styles.container_links_div}
      >
        <Link href={`/profile/${id}/edit/about`} passHref>
          <span>About</span>
        </Link>
      </div>

      <div
        style={addBorderHighlight("occupation")}
        className={Styles.container_links_div}
      >
        <Link href={`/profile/${id}/edit/occupation`} passHref>
          <span>Occupation</span>
        </Link>
      </div>

      <div
        style={addBorderHighlight("education")}
        className={Styles.container_links_div}
      >
        <Link href={`/profile/${id}/edit/education`} passHref>
          <span>Education</span>
        </Link>
      </div>
    </>
  );
};

export default EditProfileRoutingLinks;
