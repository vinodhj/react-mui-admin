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
  TransportOptions: { input: any; output: any };
  _DirectiveExtensions: { input: any; output: any };
};

export type AdminKvAsset = {
  __typename?: 'AdminKvAsset';
  kv_key: Scalars['String']['output'];
  kv_value?: Maybe<Scalars['JSON']['output']>;
};

export type AdminKvAssetInput = {
  kv_key: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  created_at: Scalars['DateTime']['output'];
  created_by: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  updated_by: Scalars['String']['output'];
};

export type CategoryFilter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryResponse = {
  __typename?: 'CategoryResponse';
  category?: Maybe<CategorySuccessResponse>;
  success: Scalars['Boolean']['output'];
};

export type CategorySuccessResponse = {
  __typename?: 'CategorySuccessResponse';
  category_type: CategoryType;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export enum CategoryType {
  ExpenseFynix = 'EXPENSE_FYNIX',
  ExpenseMode = 'EXPENSE_MODE',
  ExpenseTag = 'EXPENSE_TAG',
}

export type ChangePasswordInput = {
  confirm_password: Scalars['String']['input'];
  current_password: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  new_password: Scalars['String']['input'];
};

export enum ColumnName {
  Address = 'address',
  City = 'city',
  Country = 'country',
  Email = 'email',
  Id = 'id',
  Name = 'name',
  Phone = 'phone',
  Role = 'role',
  State = 'state',
  Zipcode = 'zipcode',
}

export type CreateCategoryInput = {
  category_type: CategoryType;
  name: Scalars['String']['input'];
};

export type CreateExpenseTrackerInput = {
  amount: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  expense_period: Scalars['String']['input'];
  fynix_id: Scalars['ID']['input'];
  item_details?: InputMaybe<Scalars['String']['input']>;
  mode_id: Scalars['ID']['input'];
  status: ExpenseStatus;
  tag_id: Scalars['ID']['input'];
  user_id: Scalars['ID']['input'];
};

export type DeleteCategoryInput = {
  category_type: CategoryType;
  id: Scalars['ID']['input'];
};

export type DeleteExpenseTrackerInput = {
  id: Scalars['ID']['input'];
  user_id: Scalars['ID']['input'];
};

export type DeleteUserInput = {
  id: Scalars['ID']['input'];
};

export type EditUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  role?: InputMaybe<Role>;
  state?: InputMaybe<Scalars['String']['input']>;
  zipcode?: InputMaybe<Scalars['String']['input']>;
};

export type EditUserResponse = {
  __typename?: 'EditUserResponse';
  success: Scalars['Boolean']['output'];
  user?: Maybe<UserSuccessResponse>;
};

export enum ExpenseStatus {
  NextDue = 'NextDue',
  Paid = 'Paid',
  UnPaid = 'UnPaid',
}

export type ExpenseTracker = {
  __typename?: 'ExpenseTracker';
  amount: Scalars['Float']['output'];
  created_at: Scalars['DateTime']['output'];
  created_by: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  expense_period: Scalars['String']['output'];
  fynix: Category;
  fynix_id: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  is_disabled: Scalars['Boolean']['output'];
  item_details?: Maybe<Scalars['String']['output']>;
  mode: Category;
  mode_id: Scalars['ID']['output'];
  status: ExpenseStatus;
  tag: Category;
  tag_id: Scalars['ID']['output'];
  updated_at: Scalars['DateTime']['output'];
  updated_by: Scalars['String']['output'];
  user: User;
  user_id: Scalars['String']['output'];
};

export type ExpenseTrackerConnection = {
  __typename?: 'ExpenseTrackerConnection';
  edges: Array<ExpenseTrackerEdge>;
  pageInfo: PageInfo;
};

export type ExpenseTrackerEdge = {
  __typename?: 'ExpenseTrackerEdge';
  cursor: Scalars['String']['output'];
  node: ExpenseTracker;
};

export type ExpenseTrackerResponse = {
  __typename?: 'ExpenseTrackerResponse';
  expenseTracker?: Maybe<ExpenseTrackerSuccessResponse>;
  success: Scalars['Boolean']['output'];
};

export type ExpenseTrackerSuccessResponse = {
  __typename?: 'ExpenseTrackerSuccessResponse';
  amount: Scalars['Float']['output'];
  created_at: Scalars['DateTime']['output'];
  created_by: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  expense_period: Scalars['String']['output'];
  fynix_id: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  item_details?: Maybe<Scalars['String']['output']>;
  mode_id: Scalars['ID']['output'];
  status: ExpenseStatus;
  tag_id: Scalars['ID']['output'];
  updated_at: Scalars['DateTime']['output'];
  updated_by: Scalars['String']['output'];
  user_id: Scalars['String']['output'];
};

export type GenericCategoryResponse = {
  __typename?: 'GenericCategoryResponse';
  category_type: CategoryType;
  created_at: Scalars['DateTime']['output'];
  created_by: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  is_disabled: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  updated_by: Scalars['String']['output'];
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
  createCategory: CategoryResponse;
  createExpenseTracker: ExpenseTrackerResponse;
  deleteCategory: Scalars['Boolean']['output'];
  deleteExpenseTracker: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  editUser: EditUserResponse;
  login: LoginResponse;
  logout: LogoutResponse;
  signUp: SignUpResponse;
  updateCategory: CategoryResponse;
  updateExpenseTracker: ExpenseTrackerResponse;
};

export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};

export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};

export type MutationCreateExpenseTrackerArgs = {
  input: CreateExpenseTrackerInput;
};

export type MutationDeleteCategoryArgs = {
  input: DeleteCategoryInput;
};

export type MutationDeleteExpenseTrackerArgs = {
  input: DeleteExpenseTrackerInput;
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

export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};

export type MutationUpdateExpenseTrackerArgs = {
  input: UpdateExpenseTrackerInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type PaginatedExpenseInputs = {
  after?: InputMaybe<Scalars['String']['input']>;
  expense_period?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  fynix_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  max_amount?: InputMaybe<Scalars['Float']['input']>;
  min_amount?: InputMaybe<Scalars['Float']['input']>;
  mode_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  sort?: InputMaybe<Sort>;
  sort_by?: InputMaybe<Sort_By>;
  statuses?: InputMaybe<Array<InputMaybe<ExpenseStatus>>>;
  tag_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  user_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type PaginatedUsersInputs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Sort>;
  sort_by?: InputMaybe<Sort_By>;
};

export type Query = {
  __typename?: 'Query';
  adminKvAsset?: Maybe<AdminKvAsset>;
  expenseFynixes?: Maybe<Array<Maybe<Category>>>;
  expenseModes?: Maybe<Array<Maybe<Category>>>;
  expenseTags?: Maybe<Array<Maybe<Category>>>;
  expenseTrackerById?: Maybe<ExpenseTracker>;
  expenseTrackerByUserIds: Array<Maybe<ExpenseTracker>>;
  paginatedExpenseTrackers: ExpenseTrackerConnection;
  paginatedUsers?: Maybe<UsersConnection>;
  userByEmail?: Maybe<UserResponse>;
  userByfield?: Maybe<Array<Maybe<UserResponse>>>;
  users?: Maybe<Array<Maybe<UserResponse>>>;
};

export type QueryAdminKvAssetArgs = {
  input: AdminKvAssetInput;
};

export type QueryExpenseFynixesArgs = {
  input?: InputMaybe<CategoryFilter>;
};

export type QueryExpenseModesArgs = {
  input?: InputMaybe<CategoryFilter>;
};

export type QueryExpenseTagsArgs = {
  input?: InputMaybe<CategoryFilter>;
};

export type QueryExpenseTrackerByIdArgs = {
  id: Scalars['ID']['input'];
  session_id: Scalars['ID']['input'];
};

export type QueryExpenseTrackerByUserIdsArgs = {
  session_id: Scalars['ID']['input'];
  user_ids: Array<Scalars['ID']['input']>;
};

export type QueryPaginatedExpenseTrackersArgs = {
  input?: InputMaybe<PaginatedExpenseInputs>;
  session_id: Scalars['ID']['input'];
};

export type QueryPaginatedUsersArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  input?: InputMaybe<PaginatedUsersInputs>;
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

export enum Sort_By {
  CreatedAt = 'CREATED_AT',
  UpdatedAt = 'UPDATED_AT',
}

export type SignUpInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  role?: InputMaybe<Role>;
  state?: InputMaybe<Scalars['String']['input']>;
  zipcode?: InputMaybe<Scalars['String']['input']>;
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  success: Scalars['Boolean']['output'];
  user?: Maybe<UserSuccessResponse>;
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type UpdateCategoryInput = {
  category_type: CategoryType;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateExpenseTrackerInput = {
  amount: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  expense_period: Scalars['String']['input'];
  fynix_id: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  item_details?: InputMaybe<Scalars['String']['input']>;
  mode_id: Scalars['ID']['input'];
  status: ExpenseStatus;
  tag_id: Scalars['ID']['input'];
  user_id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  created_by: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: Role;
  state?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTime']['output'];
  updated_by: Scalars['String']['output'];
  zipcode?: Maybe<Scalars['String']['output']>;
};

export type UserByEmailInput = {
  email: Scalars['String']['input'];
};

export type UserByFieldInput = {
  field: ColumnName;
  value: Scalars['String']['input'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String']['output'];
  node: UserResponse;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  created_by: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: Role;
  state?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTime']['output'];
  updated_by: Scalars['String']['output'];
  zipcode?: Maybe<Scalars['String']['output']>;
};

export type UserSuccessResponse = {
  __typename?: 'UserSuccessResponse';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: Role;
  state?: Maybe<Scalars['String']['output']>;
  zipcode?: Maybe<Scalars['String']['output']>;
};

export type UsersConnection = {
  __typename?: 'UsersConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
};

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;

export type ChangePasswordMutation = { __typename?: 'Mutation'; changePassword: boolean };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;

export type SignUpMutation = {
  __typename: 'Mutation';
  signUp: {
    __typename: 'SignUpResponse';
    success: boolean;
    user?: {
      __typename: 'UserSuccessResponse';
      email: string;
      id: string;
      name: string;
      phone: string;
      role: Role;
      address?: string | null;
      city?: string | null;
      state?: string | null;
      country?: string | null;
      zipcode?: string | null;
    } | null;
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
    user?: {
      __typename: 'UserSuccessResponse';
      id: string;
      name: string;
      email: string;
      phone: string;
      role: Role;
      address?: string | null;
      city?: string | null;
      state?: string | null;
      country?: string | null;
      zipcode?: string | null;
    } | null;
  };
};

export type CreateCategoryMutationMutationVariables = Exact<{
  input: CreateCategoryInput;
}>;

export type CreateCategoryMutationMutation = {
  __typename?: 'Mutation';
  createCategory: {
    __typename: 'CategoryResponse';
    success: boolean;
    category?: { __typename: 'CategorySuccessResponse'; id: string; name: string; category_type: CategoryType } | null;
  };
};

export type DeleteCategoryMutationVariables = Exact<{
  input: DeleteCategoryInput;
}>;

export type DeleteCategoryMutation = { __typename: 'Mutation'; deleteCategory: boolean };

export type UpdateCategoryMutationMutationVariables = Exact<{
  input: UpdateCategoryInput;
}>;

export type UpdateCategoryMutationMutation = {
  __typename?: 'Mutation';
  updateCategory: {
    __typename: 'CategoryResponse';
    success: boolean;
    category?: { __typename: 'CategorySuccessResponse'; id: string; name: string; category_type: CategoryType } | null;
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
    user?: {
      __typename: 'UserSuccessResponse';
      id: string;
      name: string;
      email: string;
      phone: string;
      role: Role;
      address?: string | null;
      city?: string | null;
      state?: string | null;
      country?: string | null;
      zipcode?: string | null;
    } | null;
  };
};

export type AdminKvAssetQueryVariables = Exact<{
  input: AdminKvAssetInput;
}>;

export type AdminKvAssetQuery = {
  __typename?: 'Query';
  adminKvAsset?: { __typename: 'AdminKvAsset'; kv_key: string; kv_value?: any | null } | null;
};

export type ExpenseFynixesQueryVariables = Exact<{
  categoryFilter?: InputMaybe<CategoryFilter>;
}>;

export type ExpenseFynixesQuery = {
  __typename?: 'Query';
  expenseFynixes?: Array<{
    __typename: 'Category';
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
  } | null> | null;
};

export type ExpenseModesQueryVariables = Exact<{
  categoryFilter?: InputMaybe<CategoryFilter>;
}>;

export type ExpenseModesQuery = {
  __typename?: 'Query';
  expenseModes?: Array<{
    __typename: 'Category';
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
  } | null> | null;
};

export type ExpenseTagsQueryVariables = Exact<{
  categoryFilter?: InputMaybe<CategoryFilter>;
}>;

export type ExpenseTagsQuery = {
  __typename?: 'Query';
  expenseTags?: Array<{
    __typename: 'Category';
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
  } | null> | null;
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
    phone: string;
    role: Role;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    zipcode?: string | null;
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
    phone: string;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    zipcode?: string | null;
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
export const SignUpDocument = gql`
  mutation SignUp($input: SignUpInput!) {
    __typename
    signUp(input: $input) {
      success
      __typename
      user {
        __typename
        email
        id
        name
        phone
        role
        address
        city
        state
        country
        zipcode
      }
    }
  }
`;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
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
        phone
        role
        address
        city
        state
        country
        zipcode
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
export const CreateCategoryMutationDocument = gql`
  mutation CreateCategoryMutation($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      __typename
      success
      category {
        __typename
        id
        name
        category_type
      }
    }
  }
`;
export type CreateCategoryMutationMutationFn = Apollo.MutationFunction<
  CreateCategoryMutationMutation,
  CreateCategoryMutationMutationVariables
>;

/**
 * __useCreateCategoryMutationMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutationMutation, { data, loading, error }] = useCreateCategoryMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCategoryMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutationMutation, CreateCategoryMutationMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCategoryMutationMutation, CreateCategoryMutationMutationVariables>(
    CreateCategoryMutationDocument,
    options
  );
}
export type CreateCategoryMutationMutationHookResult = ReturnType<typeof useCreateCategoryMutationMutation>;
export type CreateCategoryMutationMutationResult = Apollo.MutationResult<CreateCategoryMutationMutation>;
export type CreateCategoryMutationMutationOptions = Apollo.BaseMutationOptions<
  CreateCategoryMutationMutation,
  CreateCategoryMutationMutationVariables
>;
export const DeleteCategoryDocument = gql`
  mutation DeleteCategory($input: DeleteCategoryInput!) {
    __typename
    deleteCategory(input: $input)
  }
`;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
}
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const UpdateCategoryMutationDocument = gql`
  mutation UpdateCategoryMutation($input: UpdateCategoryInput!) {
    updateCategory(input: $input) {
      __typename
      success
      category {
        __typename
        id
        name
        category_type
      }
    }
  }
`;
export type UpdateCategoryMutationMutationFn = Apollo.MutationFunction<
  UpdateCategoryMutationMutation,
  UpdateCategoryMutationMutationVariables
>;

/**
 * __useUpdateCategoryMutationMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutationMutation, { data, loading, error }] = useUpdateCategoryMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCategoryMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutationMutation, UpdateCategoryMutationMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateCategoryMutationMutation, UpdateCategoryMutationMutationVariables>(
    UpdateCategoryMutationDocument,
    options
  );
}
export type UpdateCategoryMutationMutationHookResult = ReturnType<typeof useUpdateCategoryMutationMutation>;
export type UpdateCategoryMutationMutationResult = Apollo.MutationResult<UpdateCategoryMutationMutation>;
export type UpdateCategoryMutationMutationOptions = Apollo.BaseMutationOptions<
  UpdateCategoryMutationMutation,
  UpdateCategoryMutationMutationVariables
>;
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
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      __typename
      success
      token
      user {
        __typename
        id
        name
        email
        phone
        role
        address
        city
        state
        country
        zipcode
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
export const ExpenseFynixesDocument = gql`
  query ExpenseFynixes($categoryFilter: CategoryFilter) {
    expenseFynixes(input: $categoryFilter) {
      __typename
      id
      name
      created_at
      updated_at
      created_by
      updated_by
    }
  }
`;

/**
 * __useExpenseFynixesQuery__
 *
 * To run a query within a React component, call `useExpenseFynixesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExpenseFynixesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExpenseFynixesQuery({
 *   variables: {
 *      categoryFilter: // value for 'categoryFilter'
 *   },
 * });
 */
export function useExpenseFynixesQuery(baseOptions?: Apollo.QueryHookOptions<ExpenseFynixesQuery, ExpenseFynixesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ExpenseFynixesQuery, ExpenseFynixesQueryVariables>(ExpenseFynixesDocument, options);
}
export function useExpenseFynixesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExpenseFynixesQuery, ExpenseFynixesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ExpenseFynixesQuery, ExpenseFynixesQueryVariables>(ExpenseFynixesDocument, options);
}
export function useExpenseFynixesSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ExpenseFynixesQuery, ExpenseFynixesQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ExpenseFynixesQuery, ExpenseFynixesQueryVariables>(ExpenseFynixesDocument, options);
}
export type ExpenseFynixesQueryHookResult = ReturnType<typeof useExpenseFynixesQuery>;
export type ExpenseFynixesLazyQueryHookResult = ReturnType<typeof useExpenseFynixesLazyQuery>;
export type ExpenseFynixesSuspenseQueryHookResult = ReturnType<typeof useExpenseFynixesSuspenseQuery>;
export type ExpenseFynixesQueryResult = Apollo.QueryResult<ExpenseFynixesQuery, ExpenseFynixesQueryVariables>;
export const ExpenseModesDocument = gql`
  query ExpenseModes($categoryFilter: CategoryFilter) {
    expenseModes(input: $categoryFilter) {
      __typename
      id
      name
      created_at
      updated_at
      created_by
      updated_by
    }
  }
`;

/**
 * __useExpenseModesQuery__
 *
 * To run a query within a React component, call `useExpenseModesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExpenseModesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExpenseModesQuery({
 *   variables: {
 *      categoryFilter: // value for 'categoryFilter'
 *   },
 * });
 */
export function useExpenseModesQuery(baseOptions?: Apollo.QueryHookOptions<ExpenseModesQuery, ExpenseModesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ExpenseModesQuery, ExpenseModesQueryVariables>(ExpenseModesDocument, options);
}
export function useExpenseModesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExpenseModesQuery, ExpenseModesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ExpenseModesQuery, ExpenseModesQueryVariables>(ExpenseModesDocument, options);
}
export function useExpenseModesSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ExpenseModesQuery, ExpenseModesQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ExpenseModesQuery, ExpenseModesQueryVariables>(ExpenseModesDocument, options);
}
export type ExpenseModesQueryHookResult = ReturnType<typeof useExpenseModesQuery>;
export type ExpenseModesLazyQueryHookResult = ReturnType<typeof useExpenseModesLazyQuery>;
export type ExpenseModesSuspenseQueryHookResult = ReturnType<typeof useExpenseModesSuspenseQuery>;
export type ExpenseModesQueryResult = Apollo.QueryResult<ExpenseModesQuery, ExpenseModesQueryVariables>;
export const ExpenseTagsDocument = gql`
  query ExpenseTags($categoryFilter: CategoryFilter) {
    expenseTags(input: $categoryFilter) {
      __typename
      id
      name
      created_at
      updated_at
      created_by
      updated_by
    }
  }
`;

/**
 * __useExpenseTagsQuery__
 *
 * To run a query within a React component, call `useExpenseTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExpenseTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExpenseTagsQuery({
 *   variables: {
 *      categoryFilter: // value for 'categoryFilter'
 *   },
 * });
 */
export function useExpenseTagsQuery(baseOptions?: Apollo.QueryHookOptions<ExpenseTagsQuery, ExpenseTagsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ExpenseTagsQuery, ExpenseTagsQueryVariables>(ExpenseTagsDocument, options);
}
export function useExpenseTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExpenseTagsQuery, ExpenseTagsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ExpenseTagsQuery, ExpenseTagsQueryVariables>(ExpenseTagsDocument, options);
}
export function useExpenseTagsSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ExpenseTagsQuery, ExpenseTagsQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ExpenseTagsQuery, ExpenseTagsQueryVariables>(ExpenseTagsDocument, options);
}
export type ExpenseTagsQueryHookResult = ReturnType<typeof useExpenseTagsQuery>;
export type ExpenseTagsLazyQueryHookResult = ReturnType<typeof useExpenseTagsLazyQuery>;
export type ExpenseTagsSuspenseQueryHookResult = ReturnType<typeof useExpenseTagsSuspenseQuery>;
export type ExpenseTagsQueryResult = Apollo.QueryResult<ExpenseTagsQuery, ExpenseTagsQueryVariables>;
export const UserByFieldDocument = gql`
  query UserByField($field: ColumnName!, $value: String!) {
    userByfield(input: { field: $field, value: $value }) {
      __typename
      id
      name
      email
      phone
      role
      address
      city
      state
      country
      zipcode
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
      phone
      address
      city
      state
      country
      zipcode
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
