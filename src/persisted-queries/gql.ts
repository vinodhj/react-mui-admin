/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  'mutation ChangePassword($input: ChangePasswordInput!) {\n  changePassword(input: $input)\n}': typeof types.ChangePasswordDocument;
  'mutation CreateUser($input: SignUpInput!) {\n  __typename\n  signUp(input: $input) {\n    success\n    __typename\n    user {\n      __typename\n      email\n      id\n      name\n      role\n    }\n  }\n}': typeof types.CreateUserDocument;
  'mutation DeleteUser($id: ID!) {\n  __typename\n  deleteUser(input: {id: $id})\n}': typeof types.DeleteUserDocument;
  'mutation EditUser($input: EditUserInput!) {\n  editUser(input: $input) {\n    __typename\n    success\n    user {\n      __typename\n      id\n      name\n      email\n      role\n    }\n  }\n}': typeof types.EditUserDocument;
  'mutation LogOut {\n  logout {\n    success\n  }\n}': typeof types.LogOutDocument;
  'mutation login($email: String!, $password: String!) {\n  login(input: {email: $email, password: $password}) {\n    __typename\n    success\n    token\n    user {\n      __typename\n      id\n      name\n      email\n      role\n    }\n  }\n}': typeof types.LoginDocument;
  'query UserByField($field: ColumnName!, $value: String!) {\n  userByfield(input: {field: $field, value: $value}) {\n    __typename\n    id\n    name\n    email\n    role\n    created_at\n    updated_at\n  }\n}': typeof types.UserByFieldDocument;
  'query AllUsers {\n  users {\n    __typename\n    id\n    name\n    email\n    role\n    created_at\n    updated_at\n  }\n}': typeof types.AllUsersDocument;
};
const documents: Documents = {
  'mutation ChangePassword($input: ChangePasswordInput!) {\n  changePassword(input: $input)\n}': types.ChangePasswordDocument,
  'mutation CreateUser($input: SignUpInput!) {\n  __typename\n  signUp(input: $input) {\n    success\n    __typename\n    user {\n      __typename\n      email\n      id\n      name\n      role\n    }\n  }\n}':
    types.CreateUserDocument,
  'mutation DeleteUser($id: ID!) {\n  __typename\n  deleteUser(input: {id: $id})\n}': types.DeleteUserDocument,
  'mutation EditUser($input: EditUserInput!) {\n  editUser(input: $input) {\n    __typename\n    success\n    user {\n      __typename\n      id\n      name\n      email\n      role\n    }\n  }\n}':
    types.EditUserDocument,
  'mutation LogOut {\n  logout {\n    success\n  }\n}': types.LogOutDocument,
  'mutation login($email: String!, $password: String!) {\n  login(input: {email: $email, password: $password}) {\n    __typename\n    success\n    token\n    user {\n      __typename\n      id\n      name\n      email\n      role\n    }\n  }\n}':
    types.LoginDocument,
  'query UserByField($field: ColumnName!, $value: String!) {\n  userByfield(input: {field: $field, value: $value}) {\n    __typename\n    id\n    name\n    email\n    role\n    created_at\n    updated_at\n  }\n}':
    types.UserByFieldDocument,
  'query AllUsers {\n  users {\n    __typename\n    id\n    name\n    email\n    role\n    created_at\n    updated_at\n  }\n}':
    types.AllUsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'mutation ChangePassword($input: ChangePasswordInput!) {\n  changePassword(input: $input)\n}'
): typeof documents['mutation ChangePassword($input: ChangePasswordInput!) {\n  changePassword(input: $input)\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'mutation CreateUser($input: SignUpInput!) {\n  __typename\n  signUp(input: $input) {\n    success\n    __typename\n    user {\n      __typename\n      email\n      id\n      name\n      role\n    }\n  }\n}'
): typeof documents['mutation CreateUser($input: SignUpInput!) {\n  __typename\n  signUp(input: $input) {\n    success\n    __typename\n    user {\n      __typename\n      email\n      id\n      name\n      role\n    }\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'mutation DeleteUser($id: ID!) {\n  __typename\n  deleteUser(input: {id: $id})\n}'
): typeof documents['mutation DeleteUser($id: ID!) {\n  __typename\n  deleteUser(input: {id: $id})\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'mutation EditUser($input: EditUserInput!) {\n  editUser(input: $input) {\n    __typename\n    success\n    user {\n      __typename\n      id\n      name\n      email\n      role\n    }\n  }\n}'
): typeof documents['mutation EditUser($input: EditUserInput!) {\n  editUser(input: $input) {\n    __typename\n    success\n    user {\n      __typename\n      id\n      name\n      email\n      role\n    }\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'mutation LogOut {\n  logout {\n    success\n  }\n}'
): typeof documents['mutation LogOut {\n  logout {\n    success\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'mutation login($email: String!, $password: String!) {\n  login(input: {email: $email, password: $password}) {\n    __typename\n    success\n    token\n    user {\n      __typename\n      id\n      name\n      email\n      role\n    }\n  }\n}'
): typeof documents['mutation login($email: String!, $password: String!) {\n  login(input: {email: $email, password: $password}) {\n    __typename\n    success\n    token\n    user {\n      __typename\n      id\n      name\n      email\n      role\n    }\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query UserByField($field: ColumnName!, $value: String!) {\n  userByfield(input: {field: $field, value: $value}) {\n    __typename\n    id\n    name\n    email\n    role\n    created_at\n    updated_at\n  }\n}'
): typeof documents['query UserByField($field: ColumnName!, $value: String!) {\n  userByfield(input: {field: $field, value: $value}) {\n    __typename\n    id\n    name\n    email\n    role\n    created_at\n    updated_at\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query AllUsers {\n  users {\n    __typename\n    id\n    name\n    email\n    role\n    created_at\n    updated_at\n  }\n}'
): typeof documents['query AllUsers {\n  users {\n    __typename\n    id\n    name\n    email\n    role\n    created_at\n    updated_at\n  }\n}'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<infer TType, any>
  ? TType
  : never;
