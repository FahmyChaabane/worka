import React, { useContext } from "react";
import { useRouter } from "next/router";
import { ConnectionContext } from "../../../pages/_app";
import Link from "next/link";
import Image from "next/image";
import HowItWorksMenu from "./howItWorksMenu";
import BeforeLoginNav from "./beforeLoginNav";
import AfterLoginNav from "./afterLoginNav";
import Styles from "./nav.module.scss";

const Nav = () => {
  const { connected, setConnected } = useContext(ConnectionContext);

  // const [isSignupRoute, setIsSignupRoute] = useState(false);
  const router = useRouter();
  // useEffect(() => {
  //   setIsSignupRoute(router.pathname.includes("signup"));
  // }, [router.pathname]);

  const addBorderHighlight = (route) => {
    if (router.pathname.includes(route))
      return {
        borderBottom: "0.5rem solid #0980c6",
      };
  };

  return (
    <nav className={Styles.container}>
      <div className={Styles.container_left}>
        <div className={Styles.container_left_logo}>
          <Image
            className={Styles.container_left_logo_img}
            height={45}
            width={160}
            src="/images/logo-b.svg"
            alt="Worka"
          />
        </div>
        <div className={Styles.container_left_paths}>
          {/* <Link href="/find/jobs" passHref>
            <span
              style={addBorderHighlight("find/jobs")}
              className={Styles.container_left_paths_l}
            >
              Find jobs
            </span>
          </Link> */}
          {/* <Link href="/find/collegues" passHref>
              <span
                style={addBorderHighlight("find/collegues")}
                className={Styles.container_left_paths_l}
              >
                Find colleagues
              </span>
            </Link> */}
          <Link href="/questionnaires/toAnswer" passHref>
            <span
              style={addBorderHighlight("questionnaires/toAnswer")}
              className={Styles.container_left_paths_l}
            >
              Text Questionnaires
            </span>
          </Link>
          <Link href="/find/collegues" passHref>
            <span
              style={addBorderHighlight("find/collegues")}
              className={Styles.container_left_paths_l}
            >
              Video Questionnaires
            </span>
          </Link>
          <div className={Styles.container_left_work}>
            <label
              htmlFor="work-toggle"
              className={Styles.container_left_paths_l}
            >
              <p>How it works</p>
              <svg className={Styles.container_left_paths_l_flesh}>
                <use href="/images/sprite.svg#icon-chevron-down"></use>
              </svg>
            </label>
            <input
              type="checkbox"
              className={Styles.container_check}
              id="work-toggle"
            />
            <HowItWorksMenu />
          </div>
        </div>
        {/* <div className={Styles.container_left_language}>
          <div className={Styles.container_left_language_country}>
            <Image
              className={Styles.container_left_language_country_img}
              alt="country"
              // height={20}
              // width={20}
              layout="fill"
              src="/images/eng.jpg"
            />
          </div>
          English
        </div> */}
      </div>
      {/* RIGHT SIDE NAVBAR */}
      {connected ? (
        <AfterLoginNav setConnected={setConnected} />
      ) : (
        <BeforeLoginNav addBorderHighlight={addBorderHighlight} />
      )}
    </nav>
  );
};

export default Nav;
