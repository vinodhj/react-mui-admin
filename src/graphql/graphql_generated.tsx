import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: string; output: string };
};

export enum CoulmnName {
  Email = 'email',
  Id = 'id',
  Name = 'name',
  Role = 'role',
}

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserSuccessResponse>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResponse;
  signUp: SignUpResponse;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type Query = {
  __typename?: 'Query';
  userByEmail?: Maybe<UserResponse>;
  userByfield?: Maybe<Array<Maybe<UserResponse>>>;
  users?: Maybe<Array<Maybe<UserResponse>>>;
};

export type QueryUserByEmailArgs = {
  input: UserByEmailInput;
};

export type QueryUserByfieldArgs = {
  input?: InputMaybe<UserByFieldInput>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
}

export type SignUpInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role?: InputMaybe<Role>;
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  success: Scalars['Boolean']['output'];
  user?: Maybe<UserSuccessResponse>;
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: Role;
  updated_at: Scalars['DateTime']['output'];
};

export type UserByEmailInput = {
  email: Scalars['String']['input'];
};

export type UserByFieldInput = {
  field: CoulmnName;
  value: Scalars['String']['input'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  created_at: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: Role;
  updated_at: Scalars['DateTime']['output'];
};

export type UserSuccessResponse = {
  __typename?: 'UserSuccessResponse';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: Role;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'LoginResponse';
    success: boolean;
    token?: string | null;
    user?: { __typename?: 'UserSuccessResponse'; name: string } | null;
  };
};

export const LoginDocument = gql`
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
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
