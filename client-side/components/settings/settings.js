import { useState } from "react";
import Divide from "../layout/common/divide";
import Layout from "../layout/layout";
import General from "./general";
import Notification from "./notification";
import Privacy from "./privacy";
import SettingsMenu from "./settingsMenu";

const Settings = () => {
  const [page, setPage] = useState(1);

  const renterPage = (page) => {
    switch (page) {
      case 1:
        return <General />;
      case 2:
        return <Notification />;
      case 3:
        return <Privacy />;
      default:
        <p>something went wrong...</p>;
        break;
    }
  };

  return (
    <Layout>
      <Divide>
        <SettingsMenu page={page} setPage={setPage} />
        {renterPage(page)}
      </Divide>
    </Layout>
  );
};

export default Settings;
