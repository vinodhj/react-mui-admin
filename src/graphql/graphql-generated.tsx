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
  JSON: { input: any; output: any };
};

export type AdminKvAsset = {
  __typename?: 'AdminKvAsset';
  kv_key: Scalars['String']['output'];
  kv_value?: Maybe<Scalars['JSON']['output']>;
};

export type AdminKvAssetInput = {
  kv_key: Scalars['String']['input'];
};

export type ChangePasswordInput = {
  confirm_password: Scalars['String']['input'];
  current_password: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  new_password: Scalars['String']['input'];
};

export enum ColumnName {
  Email = 'email',
  Id = 'id',
  Name = 'name',
  Role = 'role',
}

export type DeleteUserInput = {
  id: Scalars['ID']['input'];
};

export type EditUserInput = {
  email: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  role?: InputMaybe<Role>;
};

export type EditUserResponse = {
  __typename?: 'EditUserResponse';
  success: Scalars['Boolean']['output'];
  user?: Maybe<UserSuccessResponse>;
};

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

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  editUser: EditUserResponse;
  login: LoginResponse;
  logout: LogoutResponse;
  signUp: SignUpResponse;
};

export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};

export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};

export type MutationEditUserArgs = {
  input: EditUserInput;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type Query = {
  __typename?: 'Query';
  adminKvAsset?: Maybe<AdminKvAsset>;
  userByEmail?: Maybe<UserResponse>;
  userByfield?: Maybe<Array<Maybe<UserResponse>>>;
  users?: Maybe<Array<Maybe<UserResponse>>>;
};

export type QueryAdminKvAssetArgs = {
  input: AdminKvAssetInput;
};

export type QueryUserByEmailArgs = {
  input: UserByEmailInput;
};

export type QueryUserByfieldArgs = {
  input: UserByFieldInput;
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
  field: ColumnName;
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

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;

export type ChangePasswordMutation = { __typename?: 'Mutation'; changePassword: boolean };

export type CreateUserMutationVariables = Exact<{
  input: SignUpInput;
}>;

export type CreateUserMutation = {
  __typename: 'Mutation';
  signUp: {
    __typename: 'SignUpResponse';
    success: boolean;
    user?: { __typename: 'UserSuccessResponse'; email: string; id: string; name: string; role: Role } | null;
  };
};

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type DeleteUserMutation = { __typename: 'Mutation'; deleteUser: boolean };

export type EditUserMutationVariables = Exact<{
  input: EditUserInput;
}>;

export type EditUserMutation = {
  __typename?: 'Mutation';
  editUser: {
    __typename: 'EditUserResponse';
    success: boolean;
    user?: { __typename: 'UserSuccessResponse'; id: string; name: string; email: string; role: Role } | null;
  };
};

export type LogOutMutationVariables = Exact<{ [key: string]: never }>;

export type LogOutMutation = { __typename?: 'Mutation'; logout: { __typename?: 'LogoutResponse'; success: boolean } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename: 'LoginResponse';
    success: boolean;
    token?: string | null;
    user?: { __typename: 'UserSuccessResponse'; id: string; name: string; email: string; role: Role } | null;
  };
};

export type AdminKvAssetQueryVariables = Exact<{
  input: AdminKvAssetInput;
}>;

export type AdminKvAssetQuery = {
  __typename?: 'Query';
  adminKvAsset?: { __typename: 'AdminKvAsset'; kv_key: string; kv_value?: any | null } | null;
};

export type UserByFieldQueryVariables = Exact<{
  field: ColumnName;
  value: Scalars['String']['input'];
}>;

export type UserByFieldQuery = {
  __typename?: 'Query';
  userByfield?: Array<{
    __typename: 'UserResponse';
    id: string;
    name: string;
    email: string;
    role: Role;
    created_at: string;
    updated_at: string;
  } | null> | null;
};

export type AllUsersQueryVariables = Exact<{ [key: string]: never }>;

export type AllUsersQuery = {
  __typename?: 'Query';
  users?: Array<{
    __typename: 'UserResponse';
    id: string;
    name: string;
    email: string;
    role: Role;
    created_at: string;
    updated_at: string;
  } | null> | null;
};

export const ChangePasswordDocument = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input)
  }
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
}
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateUserDocument = gql`
  mutation CreateUser($input: SignUpInput!) {
    __typename
    signUp(input: $input) {
      success
      __typename
      user {
        __typename
        email
        id
        name
        role
      }
    }
  }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteUserDocument = gql`
  mutation DeleteUser($id: ID!) {
    __typename
    deleteUser(input: { id: $id })
  }
`;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
}
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const EditUserDocument = gql`
  mutation EditUser($input: EditUserInput!) {
    editUser(input: $input) {
      __typename
      success
      user {
        __typename
        id
        name
        email
        role
      }
    }
  }
`;
export type EditUserMutationFn = Apollo.MutationFunction<EditUserMutation, EditUserMutationVariables>;

/**
 * __useEditUserMutation__
 *
 * To run a mutation, you first call `useEditUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserMutation, { data, loading, error }] = useEditUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditUserMutation(baseOptions?: Apollo.MutationHookOptions<EditUserMutation, EditUserMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EditUserMutation, EditUserMutationVariables>(EditUserDocument, options);
}
export type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>;
export type EditUserMutationResult = Apollo.MutationResult<EditUserMutation>;
export type EditUserMutationOptions = Apollo.BaseMutationOptions<EditUserMutation, EditUserMutationVariables>;
export const LogOutDocument = gql`
  mutation LogOut {
    logout {
      success
    }
  }
`;
export type LogOutMutationFn = Apollo.MutationFunction<LogOutMutation, LogOutMutationVariables>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: Apollo.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, options);
}
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const LoginDocument = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      __typename
      success
      token
      user {
        __typename
        id
        name
        email
        role
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
export const AdminKvAssetDocument = gql`
  query AdminKVAsset($input: AdminKvAssetInput!) {
    adminKvAsset(input: $input) {
      __typename
      kv_key
      kv_value
    }
  }
`;

/**
 * __useAdminKvAssetQuery__
 *
 * To run a query within a React component, call `useAdminKvAssetQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminKvAssetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminKvAssetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminKvAssetQuery(
  baseOptions: Apollo.QueryHookOptions<AdminKvAssetQuery, AdminKvAssetQueryVariables> &
    ({ variables: AdminKvAssetQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AdminKvAssetQuery, AdminKvAssetQueryVariables>(AdminKvAssetDocument, options);
}
export function useAdminKvAssetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminKvAssetQuery, AdminKvAssetQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AdminKvAssetQuery, AdminKvAssetQueryVariables>(AdminKvAssetDocument, options);
}
export function useAdminKvAssetSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AdminKvAssetQuery, AdminKvAssetQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<AdminKvAssetQuery, AdminKvAssetQueryVariables>(AdminKvAssetDocument, options);
}
export type AdminKvAssetQueryHookResult = ReturnType<typeof useAdminKvAssetQuery>;
export type AdminKvAssetLazyQueryHookResult = ReturnType<typeof useAdminKvAssetLazyQuery>;
export type AdminKvAssetSuspenseQueryHookResult = ReturnType<typeof useAdminKvAssetSuspenseQuery>;
export type AdminKvAssetQueryResult = Apollo.QueryResult<AdminKvAssetQuery, AdminKvAssetQueryVariables>;
export const UserByFieldDocument = gql`
  query UserByField($field: ColumnName!, $value: String!) {
    userByfield(input: { field: $field, value: $value }) {
      __typename
      id
      name
      email
      role
      created_at
      updated_at
    }
  }
`;

/**
 * __useUserByFieldQuery__
 *
 * To run a query within a React component, call `useUserByFieldQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByFieldQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByFieldQuery({
 *   variables: {
 *      field: // value for 'field'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useUserByFieldQuery(
  baseOptions: Apollo.QueryHookOptions<UserByFieldQuery, UserByFieldQueryVariables> &
    ({ variables: UserByFieldQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserByFieldQuery, UserByFieldQueryVariables>(UserByFieldDocument, options);
}
export function useUserByFieldLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByFieldQuery, UserByFieldQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserByFieldQuery, UserByFieldQueryVariables>(UserByFieldDocument, options);
}
export function useUserByFieldSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserByFieldQuery, UserByFieldQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<UserByFieldQuery, UserByFieldQueryVariables>(UserByFieldDocument, options);
}
export type UserByFieldQueryHookResult = ReturnType<typeof useUserByFieldQuery>;
export type UserByFieldLazyQueryHookResult = ReturnType<typeof useUserByFieldLazyQuery>;
export type UserByFieldSuspenseQueryHookResult = ReturnType<typeof useUserByFieldSuspenseQuery>;
export type UserByFieldQueryResult = Apollo.QueryResult<UserByFieldQuery, UserByFieldQueryVariables>;
export const AllUsersDocument = gql`
  query AllUsers {
    users {
      __typename
      id
      name
      email
      role
      created_at
      updated_at
    }
  }
`;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
}
export function useAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
}
export function useAllUsersSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
}
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<typeof useAllUsersLazyQuery>;
export type AllUsersSuspenseQueryHookResult = ReturnType<typeof useAllUsersSuspenseQuery>;
export type AllUsersQueryResult = Apollo.QueryResult<AllUsersQuery, AllUsersQueryVariables>;
