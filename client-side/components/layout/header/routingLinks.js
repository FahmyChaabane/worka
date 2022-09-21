import { useRouter } from "next/router";
import ProfileRoutingLinks from "./profileRoutingLinks";
import Styles from "./header.module.scss";
import SavedRoutingLinks from "./savedRoutingLinks";
import CompanyRoutingLinks from "./companyRoutingLinks";
import QuestionnairesRoutingLinks from "./questionnairesRoutingLinks";
import EditProfileRoutingLinks from "./editProfileRoutingLinks";

const RoutingLinks = () => {
  const router = useRouter();

  const addBorderHighlight = (route) => {
    if (router.pathname.includes(route))
      return {
        borderBottom: "0.3rem solid #0980c6",
      };
  };

  return (
    <div className={Styles.container_links}>
      {router.pathname.includes("profile") ? (
        router.pathname.includes("edit") ? (
          <EditProfileRoutingLinks addBorderHighlight={addBorderHighlight} />
        ) : (
          <ProfileRoutingLinks addBorderHighlight={addBorderHighlight} />
        )
      ) : router.pathname.includes("saved") ? (
        <SavedRoutingLinks addBorderHighlight={addBorderHighlight} />
      ) : router.pathname.includes("company") ? (
        <CompanyRoutingLinks addBorderHighlight={addBorderHighlight} />
      ) : router.pathname.includes("questionnaires") ? (
        <QuestionnairesRoutingLinks addBorderHighlight={addBorderHighlight} />
      ) : null}
    </div>
  );
};

export default RoutingLinks;
