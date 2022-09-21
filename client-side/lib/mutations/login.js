import { gql } from "@apollo/client";

export const LOG_USER = gql`
  mutation LOG_USER($loginData: loginContent!) {
    login(data: $loginData)
  }
`;

export const SET_RESET_PWD_EMAIL = gql`
  mutation SET_RESET_PWD_EMAIL($setResetPasswordTokenEmail: String!) {
    setResetPasswordToken(email: $setResetPasswordTokenEmail)
  }
`;

export const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD($resetPasswordData: resetPasswordContent!) {
    resetPassword(data: $resetPasswordData)
  }
`;
