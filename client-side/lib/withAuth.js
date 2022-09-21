// const WithAuth = (WrappedComponent) => {
//   console.log("HOC");
//   return (props) => {
//     console.log("HOCprops", props);
//     return <WrappedComponent {...props} />;
//   };
// };
//
// export default WithAuth;

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_CURRENT_USER, GET_USER_PROFILE } from "./queries/user";
import Loader from "../components/common/loader/loader";
import Steps from "../pages/signup/steps";

// import { initializeApollo } from "./apollo";
// import { GET_CURRENT_USER } from "./queries/user";

export const amICompleted = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { loading, data } = useQuery(GET_CURRENT_USER, {
      onCompleted: () => {
        console.log("i am supposed to be coming from the cache");
      },
    });
    if (loading) return <Loader layouted={true} />;

    // console.log("HOCprops", props);
    if (data && !data?.currentUser.completed) {
      router.push(
        `/signup/steps?name=${data?.currentUser.name}&surname=${data?.currentUser.surname}`
      );
      return null;
    } else return <WrappedComponent {...props} />;
  };
};

export const withProfile = (WrappedComponent) => {
  return (props) => {
    console.log("props", props.data);
    const { loading } = useQuery(GET_USER_PROFILE, {
      variables: { getUserProfileUserId: props.data.id },
      onCompleted: () => {
        console.log("profile data has come! check out the cache");
      },
    });
    if (loading) return <Loader headed={true} />;

    // console.log("HOCprops", props);
    return <WrappedComponent {...props} />;
  };
};

const withAuthServerSideProps = (getServerSidePropsFunc) => {
  return async (ctx) => {
    console.log("token", ctx.req.cookies.token);
    const token = ctx.req.cookies.token || "";
    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    // // __APOLLO_STATE__

    // const apolloClient = initializeApollo();

    // const { data } = await apolloClient.query({
    //   query: GET_CURRENT_USER,
    //   context: {
    //     headers: {
    //       cookie: token,
    //     },
    //   },
    // });
    // // console.log("user!::", user.data);
    // // console.log("CACHE!::", apolloClient.cache.extract());
    // if (!data.currentUser.completed)
    //   return {
    //     redirect: {
    //       destination: `/signup/steps?name=${data.currentUser.name}&surname=${data.currentUser.surname}`,
    //       permanent: false,
    //     },
    //   };
    // console.log("right here", ctx.params);

    if (getServerSidePropsFunc)
      return {
        props: {
          data: getServerSidePropsFunc(ctx),
        },
      };

    return {
      props: {
        // initialApolloState: apolloClient.cache.extract(),
      },
    };
  };
};

export default withAuthServerSideProps;
