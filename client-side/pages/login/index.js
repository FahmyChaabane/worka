import LoginPage from "../../components/login/loginPage";
import { withAuthServerSideProps } from "../../lib/withAuth";

const Login = () => {
  return <LoginPage />;
};

// export default WithAuth(Login);
export default Login;
// export const getServerSideProps = withAuthServerSideProps();
