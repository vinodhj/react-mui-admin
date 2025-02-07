import { gql } from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      success
      token
      user {
        name
      }
    }
  }
`;

