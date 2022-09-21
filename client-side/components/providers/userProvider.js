import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../lib/queries/user";
import { ConnectionContext } from "../../pages/_app";
import Loader from "../common/loader/loader";

export const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  console.log("User Provider!!!!");

  const [currentUser, setCurrentUser] = useState(null);
  const { setConnected } = useContext(ConnectionContext);

  const { loading } = useQuery(GET_CURRENT_USER, {
    onCompleted: (data) => {
      console.log("user from provider onCompleted!", data.currentUser);
      setCurrentUser(data.currentUser);
      setConnected(true);
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <Loader />;

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
