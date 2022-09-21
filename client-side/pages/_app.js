import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../lib/apollo";
import SuccessComponent from "../components/layout/popup/success";
import ErrorComponent from "../components/layout/popup/error";
import UserProvider from "../components/providers/userProvider";
import "../styles/globals.scss";

export const ConnectionContext = React.createContext();
export const NotificationContext = React.createContext();

function MyApp({ Component, pageProps }) {
  console.log("_APP");

  const [connected, setConnected] = useState(false);
  const [notifyError, setNotifyError] = useState({
    show: false,
    msg: "",
    code: "",
  });
  const [notifySuccess, setNotifySuccess] = useState({
    show: false,
    msg: "",
  });
  // const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ConnectionContext.Provider value={{ connected, setConnected }}>
        <UserProvider>
          <NotificationContext.Provider
            value={{ setNotifyError, setNotifySuccess }}
          >
            {notifyError.show && (
              <ErrorComponent
                errmsg={notifyError.msg}
                code={notifyError.code}
              />
            )}
            {notifySuccess.show && (
              <SuccessComponent succmsg={notifySuccess.msg} />
            )}

            <Component {...pageProps} />
          </NotificationContext.Provider>
        </UserProvider>
      </ConnectionContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
