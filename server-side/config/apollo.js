import { ApolloServer } from "apollo-server-express";
import resolvers from "../resolvers";
import typeDefs from "../typeDefs";
import dataSources from "../data-sources";
import decodeJWT from "./decodeJWT";

export default () => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    context: ({ req, res }) => {
      if (req.headers.usertype === "company") {
        return { req, res };
      }

      // console.log("LOG", req);
      // console.log("trah", req.headers);
      // console.log("once again", req.headers.no_auth);
      // console.log("token from header", req.headers.cookie);
      // console.log("token from cookie", req.cookies.token);
      //console.log("cookie", req.headers.authorization);
      const token = req.cookies.token || req.headers.authorization || "";
      const decoded = decodeJWT(token);
      return { userID: decoded.id };
    },
  });
};
