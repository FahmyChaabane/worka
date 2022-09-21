import Link from "next/link";
import Styles from "./header.module.scss";
import { useRouter } from "next/router";

const CompanyRoutingLinks = ({ addBorderHighlight }) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div
        style={addBorderHighlight("jobs")}
        className={Styles.container_links_div}
      >
        <Link href={`/company/${id}/jobs`} passHref>
          <span>
            Jobs <span>(10)</span>
          </span>
        </Link>
      </div>
      <div
        style={addBorderHighlight("employees")}
        className={Styles.container_links_div}
      >
        <Link href={`/company/${id}/employees`} passHref>
          <span>
            Employees <span>(135)</span>
          </span>
        </Link>
      </div>
      <div
        style={addBorderHighlight("about")}
        className={Styles.container_links_div}
      >
        <Link href={`/company/${id}/about`} passHref>
          <span>About</span>
        </Link>
      </div>
      <div
        style={addBorderHighlight("questionsAnswers")}
        className={Styles.container_links_div}
      >
        <Link href={`/company/${id}/questionsAnswers`} passHref>
          <span className={Styles.container_links_div}>
            Q&As <span>(3)</span>
          </span>
        </Link>
      </div>
    </>
  );
};

export default CompanyRoutingLinks;
