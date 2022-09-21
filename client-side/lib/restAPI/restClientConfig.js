import Axios from "axios";

const instance = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URI}/api`,
  withCredentials: true,
});

// instance.interceptors.response.use(null, (error) => {
//   const expectedError =
//     error.response &&
//     error.response.status >= 400 &&
//     error.response.status < 500;
//   if (!expectedError) {
//     console.log("Something unexpected happened !");
//   }
//   return Promise.reject(error);
// });

export default instance;
