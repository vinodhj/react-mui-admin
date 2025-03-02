import type { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AdminKvAssetKeySpecifier = ('kv_key' | 'kv_value' | AdminKvAssetKeySpecifier)[];
export type AdminKvAssetFieldPolicy = {
  kv_key?: FieldPolicy<any> | FieldReadFunction<any>;
  kv_value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EditUserResponseKeySpecifier = ('success' | 'user' | EditUserResponseKeySpecifier)[];
export type EditUserResponseFieldPolicy = {
  success?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LoginResponseKeySpecifier = ('success' | 'token' | 'user' | LoginResponseKeySpecifier)[];
export type LoginResponseFieldPolicy = {
  success?: FieldPolicy<any> | FieldReadFunction<any>;
  token?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LogoutResponseKeySpecifier = ('success' | LogoutResponseKeySpecifier)[];
export type LogoutResponseFieldPolicy = {
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationKeySpecifier = ('changePassword' | 'deleteUser' | 'editUser' | 'login' | 'logout' | 'signUp' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
  changePassword?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteUser?: FieldPolicy<any> | FieldReadFunction<any>;
  editUser?: FieldPolicy<any> | FieldReadFunction<any>;
  login?: FieldPolicy<any> | FieldReadFunction<any>;
  logout?: FieldPolicy<any> | FieldReadFunction<any>;
  signUp?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryKeySpecifier = ('adminKvAsset' | 'userByEmail' | 'userByfield' | 'users' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
  adminKvAsset?: FieldPolicy<any> | FieldReadFunction<any>;
  userByEmail?: FieldPolicy<any> | FieldReadFunction<any>;
  userByfield?: FieldPolicy<any> | FieldReadFunction<any>;
  users?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SignUpResponseKeySpecifier = ('success' | 'user' | SignUpResponseKeySpecifier)[];
export type SignUpResponseFieldPolicy = {
  success?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserKeySpecifier = ('created_at' | 'email' | 'id' | 'name' | 'password' | 'role' | 'updated_at' | UserKeySpecifier)[];
export type UserFieldPolicy = {
  created_at?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  password?: FieldPolicy<any> | FieldReadFunction<any>;
  role?: FieldPolicy<any> | FieldReadFunction<any>;
  updated_at?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserResponseKeySpecifier = ('created_at' | 'email' | 'id' | 'name' | 'role' | 'updated_at' | UserResponseKeySpecifier)[];
export type UserResponseFieldPolicy = {
  created_at?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  role?: FieldPolicy<any> | FieldReadFunction<any>;
  updated_at?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserSuccessResponseKeySpecifier = ('email' | 'id' | 'name' | 'role' | UserSuccessResponseKeySpecifier)[];
export type UserSuccessResponseFieldPolicy = {
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  role?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type StrictTypedTypePolicies = {
  AdminKvAsset?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | AdminKvAssetKeySpecifier | (() => undefined | AdminKvAssetKeySpecifier);
    fields?: AdminKvAssetFieldPolicy;
  };
  EditUserResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | EditUserResponseKeySpecifier | (() => undefined | EditUserResponseKeySpecifier);
    fields?: EditUserResponseFieldPolicy;
  };
  LoginResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | LoginResponseKeySpecifier | (() => undefined | LoginResponseKeySpecifier);
    fields?: LoginResponseFieldPolicy;
  };
  LogoutResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | LogoutResponseKeySpecifier | (() => undefined | LogoutResponseKeySpecifier);
    fields?: LogoutResponseFieldPolicy;
  };
  Mutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier);
    fields?: MutationFieldPolicy;
  };
  Query?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier);
    fields?: QueryFieldPolicy;
  };
  SignUpResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SignUpResponseKeySpecifier | (() => undefined | SignUpResponseKeySpecifier);
    fields?: SignUpResponseFieldPolicy;
  };
  User?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier);
    fields?: UserFieldPolicy;
  };
  UserResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UserResponseKeySpecifier | (() => undefined | UserResponseKeySpecifier);
    fields?: UserResponseFieldPolicy;
  };
  UserSuccessResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UserSuccessResponseKeySpecifier | (() => undefined | UserSuccessResponseKeySpecifier);
    fields?: UserSuccessResponseFieldPolicy;
  };
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;
