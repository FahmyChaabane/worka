import { ApolloClient, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";
// import fetch from "node-fetch";
// import { useMemo } from "react";
// import merge from "lodash.merge";

// let apolloClient;

const uploadLink = new createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI, //127.0.0.1/
  credentials: "include", // Enable sending cookies over cross-origin requests
});

// const isSSR = typeof window === "undefined";
export const apolloClient = new ApolloClient({
  // ssrMode: isSSR, // set to true for SSR
  link: uploadLink,
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          notifications: offsetLimitPagination(),
        },
      },
    },
  }),
});

// function createApolloClient() {
//   return new ApolloClient({
//     // ssrMode: isSSR, // set to true for SSR
//     link: uploadLink,
//     cache: new InMemoryCache(),
//   });
// }

// export function initializeApollo(initialState = null) {
//   const _apolloClient = apolloClient ?? createApolloClient();

//   // If your page has Next.js data fetching methods that use Apollo Client,
//   // the initial state gets hydrated here
//   if (initialState) {
//     // Get existing cache, loaded during client side data fetching
//     const existingCache = _apolloClient.extract();

//     // Restore the cache using the data passed from
//     // getStaticProps/getServerSideProps combined with the existing cached data
//     const data = merge(existingCache, initialState);
//     _apolloClient.cache.restore(data);
//   }

//   // For SSG and SSR always create a new Apollo Client
//   if (typeof window === "undefined") return _apolloClient;

//   // Create the Apollo Client once in the client
//   if (!apolloClient) apolloClient = _apolloClient;
//   return _apolloClient;
// }

// export function useApollo(initialState) {
//   const store = useMemo(() => initializeApollo(initialState), [initialState]);
//   return store;
// }
