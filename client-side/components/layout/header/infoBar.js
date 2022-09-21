import { useRouter } from "next/router";
import ProfileOptions from "./profileOptions";
import ProfileHeader from "./profileHeader";
import ProfileEditOptions from "./profileEditOptions";
import CompanyHeader from "./companyHeader";
import CompanyOptions from "./companyOptions";
import SavedHeader from "./savedHeader";
import AppliedJobsHeader from "./appliedJobsHeader";
import QuestionnaireHeader from "./questionnairesHeader";
import ContactHeader from "./contactHeader";
import Styles from "./header.module.scss";

const InfoBar = () => {
  const router = useRouter();

  if (router.pathname.includes("contact")) return <ContactHeader />;

  return (
    <div className={Styles.container_header}>
      {router.pathname.includes("profile") ? (
        <>
          <div className={Styles.container_header_user}>
            <ProfileHeader />
          </div>
          {router.pathname.includes("edit") ? (
            <ProfileEditOptions />
          ) : (
            <ProfileOptions />
          )}
        </>
      ) : router.pathname.includes("saved") ? (
        <div className={Styles.container_header_user}>
          <SavedHeader />
        </div>
      ) : router.pathname.includes("company") ? (
        <>
          <div className={Styles.container_header_user}>
            <CompanyHeader />
          </div>
          <CompanyOptions />
        </>
      ) : router.pathname.includes("questionnaires") ? (
        <>
          <div className={Styles.container_header_user}>
            <QuestionnaireHeader />
          </div>
        </>
      ) : (
        <>
          <div className={Styles.container_header_user}>
            <AppliedJobsHeader />
          </div>
        </>
      )}
    </div>
  );
};

export default InfoBar;
