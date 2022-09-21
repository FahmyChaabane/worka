import { useRouter } from "next/router";
import Styles from "./header.module.scss";
import InfoBar from "./infoBar";
import RoutingLinks from "./routingLinks";

const Header = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <div
        style={{
          paddingBottom: router.pathname.includes("/applied") && "2rem",
        }}
        className={Styles.container}
      >
        <InfoBar />
        <RoutingLinks />
      </div>
      {children}
    </>
  );
};

export default Header;
