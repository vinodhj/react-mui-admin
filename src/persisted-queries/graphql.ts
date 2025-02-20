/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
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
    created_at: any;
    updated_at: any;
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
    created_at: any;
    updated_at: any;
  } | null> | null;
};

export const ChangePasswordDocument = {
  __meta__: { hash: 'b71997bdb2cee8b9b73900d61cd376d4d1ebc42c845f2e2ffc4970107955c2b1' },
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ChangePassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ChangePasswordInput' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'changePassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateUserDocument = {
  __meta__: { hash: '9ff05cfb067190a2e514386a8495a6571d438bcf7109e3a37cdb28b38fa19595' },
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'SignUpInput' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'signUp' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteUserDocument = {
  __meta__: { hash: '1f948686ec1aba4d12bbcd5925496d10fe264228686e24ecccc772adb6c3e685' },
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const EditUserDocument = {
  __meta__: { hash: '75d5bc5842e2f04c56d9f474b18fd2efcdfd87b8c9b9ac2eb963ad65e9b52c67' },
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'EditUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'EditUserInput' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'editUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EditUserMutation, EditUserMutationVariables>;
export const LogOutDocument = {
  __meta__: { hash: 'a7eb43b1c099d43d0035cf3d672fe73a66921563f64bddbdca10e577db555031' },
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'LogOut' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'logout' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'success' } }] },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LogOutMutation, LogOutMutationVariables>;
export const LoginDocument = {
  __meta__: { hash: '236baa363f3c0d6dc3c8dda2df5a0b51420b4a2d204f00db1e4d90eb3d6f4377' },
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'email' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'password' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const UserByFieldDocument = {
  __meta__: { hash: 'bd504d7f9958d079c0bae4e1a95f2b59e388425820ed590f5f58e1c781f20c94' },
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'UserByField' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'field' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ColumnName' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'value' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'userByfield' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'field' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'field' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'value' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'value' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserByFieldQuery, UserByFieldQueryVariables>;
export const AllUsersDocument = {
  __meta__: { hash: 'f52e45cbccb38c96baa61d37785e4ec9472e8566181d2b93bbc3921d6ff755a9' },
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AllUsers' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AllUsersQuery, AllUsersQueryVariables>;
