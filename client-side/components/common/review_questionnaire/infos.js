import { useRouter } from "next/router";
import Image from "next/image";
import UserIdentity from "../identityCards/userIdentity";
import SkillIdentity from "../identityCards/skillIdentity";
import CompanyIdentity from "../identityCards/companyIdentity";
import _ from "lodash";
import Styles from "./infos.module.scss";

const Infos = ({ info, skillData, userData, companyData }) => {
  const router = useRouter();

  // console.log("userData", userData);
  // console.log("skillData", skillData);

  return (
    <div className={Styles.nav}>
      <div className={Styles.nav_container}>
        <div className={Styles.nav_img_ctn_mgn}>
          <Image
            src={info.img}
            alt="logo"
            className={Styles.nav_img}
            width={150}
            height={150}
          />
        </div>
        <p className={Styles.nav_container_title}>{info.title}</p>
        <p className={Styles.nav_container_text}>
          Try to be as honest as possible in your {info.text} as it is
          beneficial for everyone in the platform:
        </p>

        {!_.isEmpty(userData) && <UserIdentity userData={userData} />}

        {router.pathname.includes("review") ? (
          <>
            <SkillIdentity skillData={skillData} />
          </>
        ) : (
          <CompanyIdentity companyData={companyData} />
        )}

        <ul className={Styles.nav_container_menu}>
          <li className={Styles.nav_container_menu_item}>
            Everything you say here is private and will not be shared anywhere.
          </li>
          <li className={Styles.nav_container_menu_item}>
            You can only help this person career and time by answering as
            honestly as possible.
          </li>
          <li className={Styles.nav_container_menu_item}>
            Consistent response and honest ones will guaranty you a better place
            in our algorithm.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Infos;
