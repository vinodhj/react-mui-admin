import type { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AdminKvAssetKeySpecifier = ('kv_key' | 'kv_value' | AdminKvAssetKeySpecifier)[];
export type AdminKvAssetFieldPolicy = {
  kv_key?: FieldPolicy<any> | FieldReadFunction<any>;
  kv_value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CategoryKeySpecifier = ('created_at' | 'created_by' | 'id' | 'name' | 'updated_at' | 'updated_by' | CategoryKeySpecifier)[];
export type CategoryFieldPolicy = {
  created_at?: FieldPolicy<any> | FieldReadFunction<any>;
  created_by?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  updated_at?: FieldPolicy<any> | FieldReadFunction<any>;
  updated_by?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CategoryResponseKeySpecifier = ('category' | 'success' | CategoryResponseKeySpecifier)[];
export type CategoryResponseFieldPolicy = {
  category?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CategorySuccessResponseKeySpecifier = ('category_type' | 'id' | 'name' | CategorySuccessResponseKeySpecifier)[];
export type CategorySuccessResponseFieldPolicy = {
  category_type?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EditUserResponseKeySpecifier = ('success' | 'user' | EditUserResponseKeySpecifier)[];
export type EditUserResponseFieldPolicy = {
  success?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ExpenseTrackerKeySpecifier = (
  | 'amount'
  | 'created_at'
  | 'created_by'
  | 'description'
  | 'expense_period'
  | 'fynix'
  | 'fynix_id'
  | 'id'
  | 'is_disabled'
  | 'item_details'
  | 'mode'
  | 'mode_id'
  | 'status'
  | 'tag'
  | 'tag_id'
  | 'updated_at'
  | 'updated_by'
  | 'user'
  | 'user_id'
  | ExpenseTrackerKeySpecifier
)[];
export type ExpenseTrackerFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  created_at?: FieldPolicy<any> | FieldReadFunction<any>;
  created_by?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  expense_period?: FieldPolicy<any> | FieldReadFunction<any>;
  fynix?: FieldPolicy<any> | FieldReadFunction<any>;
  fynix_id?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  is_disabled?: FieldPolicy<any> | FieldReadFunction<any>;
  item_details?: FieldPolicy<any> | FieldReadFunction<any>;
  mode?: FieldPolicy<any> | FieldReadFunction<any>;
  mode_id?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  tag?: FieldPolicy<any> | FieldReadFunction<any>;
  tag_id?: FieldPolicy<any> | FieldReadFunction<any>;
  updated_at?: FieldPolicy<any> | FieldReadFunction<any>;
  updated_by?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
  user_id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ExpenseTrackerConnectionKeySpecifier = ('edges' | 'pageInfo' | ExpenseTrackerConnectionKeySpecifier)[];
export type ExpenseTrackerConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ExpenseTrackerEdgeKeySpecifier = ('cursor' | 'node' | ExpenseTrackerEdgeKeySpecifier)[];
export type ExpenseTrackerEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ExpenseTrackerResponseKeySpecifier = ('expenseTracker' | 'success' | ExpenseTrackerResponseKeySpecifier)[];
export type ExpenseTrackerResponseFieldPolicy = {
  expenseTracker?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ExpenseTrackerSuccessResponseKeySpecifier = (
  | 'amount'
  | 'created_at'
  | 'created_by'
  | 'description'
  | 'expense_period'
  | 'fynix_id'
  | 'id'
  | 'item_details'
  | 'mode_id'
  | 'status'
  | 'tag_id'
  | 'updated_at'
  | 'updated_by'
  | 'user_id'
  | ExpenseTrackerSuccessResponseKeySpecifier
)[];
export type ExpenseTrackerSuccessResponseFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  created_at?: FieldPolicy<any> | FieldReadFunction<any>;
  created_by?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  expense_period?: FieldPolicy<any> | FieldReadFunction<any>;
  fynix_id?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  item_details?: FieldPolicy<any> | FieldReadFunction<any>;
  mode_id?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  tag_id?: FieldPolicy<any> | FieldReadFunction<any>;
  updated_at?: FieldPolicy<any> | FieldReadFunction<any>;
  updated_by?: FieldPolicy<any> | FieldReadFunction<any>;
  user_id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GenericCategoryResponseKeySpecifier = (
  | 'category_type'
  | 'created_at'
  | 'created_by'
  | 'id'
  | 'is_disabled'
  | 'name'
  | 'updated_at'
  | 'updated_by'
  | GenericCategoryResponseKeySpecifier
)[];
export type GenericCategoryResponseFieldPolicy = {
  category_type?: FieldPolicy<any> | FieldReadFunction<any>;
  created_at?: FieldPolicy<any> | FieldReadFunction<any>;
  created_by?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  is_disabled?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  updated_at?: FieldPolicy<any> | FieldReadFunction<any>;
  updated_by?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type MutationKeySpecifier = (
  | 'changePassword'
  | 'createCategory'
  | 'createExpenseTracker'
  | 'deleteCategory'
  | 'deleteExpenseTracker'
  | 'deleteUser'
  | 'editUser'
  | 'login'
  | 'logout'
  | 'signUp'
  | 'updateCategory'
  | 'updateExpenseTracker'
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  changePassword?: FieldPolicy<any> | FieldReadFunction<any>;
  createCategory?: FieldPolicy<any> | FieldReadFunction<any>;
  createExpenseTracker?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteCategory?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteExpenseTracker?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteUser?: FieldPolicy<any> | FieldReadFunction<any>;
  editUser?: FieldPolicy<any> | FieldReadFunction<any>;
  login?: FieldPolicy<any> | FieldReadFunction<any>;
  logout?: FieldPolicy<any> | FieldReadFunction<any>;
  signUp?: FieldPolicy<any> | FieldReadFunction<any>;
  updateCategory?: FieldPolicy<any> | FieldReadFunction<any>;
  updateExpenseTracker?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PageInfoKeySpecifier = ('endCursor' | 'hasNextPage' | 'totalCount' | PageInfoKeySpecifier)[];
export type PageInfoFieldPolicy = {
  endCursor?: FieldPolicy<any> | FieldReadFunction<any>;
  hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryKeySpecifier = (
  | 'adminKvAsset'
  | 'expenseFynixes'
  | 'expenseModes'
  | 'expenseTags'
  | 'expenseTrackerById'
  | 'expenseTrackerByUserIds'
  | 'paginatedExpenseTrackers'
  | 'paginatedUsers'
  | 'userByEmail'
  | 'userByfield'
  | 'users'
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  adminKvAsset?: FieldPolicy<any> | FieldReadFunction<any>;
  expenseFynixes?: FieldPolicy<any> | FieldReadFunction<any>;
  expenseModes?: FieldPolicy<any> | FieldReadFunction<any>;
  expenseTags?: FieldPolicy<any> | FieldReadFunction<any>;
  expenseTrackerById?: FieldPolicy<any> | FieldReadFunction<any>;
  expenseTrackerByUserIds?: FieldPolicy<any> | FieldReadFunction<any>;
  paginatedExpenseTrackers?: FieldPolicy<any> | FieldReadFunction<any>;
  paginatedUsers?: FieldPolicy<any> | FieldReadFunction<any>;
  userByEmail?: FieldPolicy<any> | FieldReadFunction<any>;
  userByfield?: FieldPolicy<any> | FieldReadFunction<any>;
  users?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SignUpResponseKeySpecifier = ('success' | 'user' | SignUpResponseKeySpecifier)[];
export type SignUpResponseFieldPolicy = {
  success?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserKeySpecifier = (
  | 'address'
  | 'city'
  | 'country'
  | 'created_at'
  | 'created_by'
  | 'email'
  | 'id'
  | 'name'
  | 'password'
  | 'phone'
  | 'role'
  | 'state'
  | 'updated_at'
  | 'updated_by'
  | 'zipcode'
  | UserKeySpecifier
)[];
export type UserFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  city?: FieldPolicy<any> | FieldReadFunction<any>;
  country?: FieldPolicy<any> | FieldReadFunction<any>;
  created_at?: FieldPolicy<any> | FieldReadFunction<any>;
  created_by?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  password?: FieldPolicy<any> | FieldReadFunction<any>;
  phone?: FieldPolicy<any> | FieldReadFunction<any>;
  role?: FieldPolicy<any> | FieldReadFunction<any>;
  state?: FieldPolicy<any> | FieldReadFunction<any>;
  updated_at?: FieldPolicy<any> | FieldReadFunction<any>;
  updated_by?: FieldPolicy<any> | FieldReadFunction<any>;
  zipcode?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserEdgeKeySpecifier = ('cursor' | 'node' | UserEdgeKeySpecifier)[];
export type UserEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserResponseKeySpecifier = (
  | 'address'
  | 'city'
  | 'country'
  | 'created_at'
  | 'created_by'
  | 'email'
  | 'id'
  | 'name'
  | 'phone'
  | 'role'
  | 'state'
  | 'updated_at'
  | 'updated_by'
  | 'zipcode'
  | UserResponseKeySpecifier
)[];
export type UserResponseFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  city?: FieldPolicy<any> | FieldReadFunction<any>;
  country?: FieldPolicy<any> | FieldReadFunction<any>;
  created_at?: FieldPolicy<any> | FieldReadFunction<any>;
  created_by?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  phone?: FieldPolicy<any> | FieldReadFunction<any>;
  role?: FieldPolicy<any> | FieldReadFunction<any>;
  state?: FieldPolicy<any> | FieldReadFunction<any>;
  updated_at?: FieldPolicy<any> | FieldReadFunction<any>;
  updated_by?: FieldPolicy<any> | FieldReadFunction<any>;
  zipcode?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserSuccessResponseKeySpecifier = (
  | 'address'
  | 'city'
  | 'country'
  | 'email'
  | 'id'
  | 'name'
  | 'phone'
  | 'role'
  | 'state'
  | 'zipcode'
  | UserSuccessResponseKeySpecifier
)[];
export type UserSuccessResponseFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  city?: FieldPolicy<any> | FieldReadFunction<any>;
  country?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  phone?: FieldPolicy<any> | FieldReadFunction<any>;
  role?: FieldPolicy<any> | FieldReadFunction<any>;
  state?: FieldPolicy<any> | FieldReadFunction<any>;
  zipcode?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UsersConnectionKeySpecifier = ('edges' | 'pageInfo' | UsersConnectionKeySpecifier)[];
export type UsersConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type StrictTypedTypePolicies = {
  AdminKvAsset?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | AdminKvAssetKeySpecifier | (() => undefined | AdminKvAssetKeySpecifier);
    fields?: AdminKvAssetFieldPolicy;
  };
  Category?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CategoryKeySpecifier | (() => undefined | CategoryKeySpecifier);
    fields?: CategoryFieldPolicy;
  };
  CategoryResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CategoryResponseKeySpecifier | (() => undefined | CategoryResponseKeySpecifier);
    fields?: CategoryResponseFieldPolicy;
  };
  CategorySuccessResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CategorySuccessResponseKeySpecifier | (() => undefined | CategorySuccessResponseKeySpecifier);
    fields?: CategorySuccessResponseFieldPolicy;
  };
  EditUserResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | EditUserResponseKeySpecifier | (() => undefined | EditUserResponseKeySpecifier);
    fields?: EditUserResponseFieldPolicy;
  };
  ExpenseTracker?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ExpenseTrackerKeySpecifier | (() => undefined | ExpenseTrackerKeySpecifier);
    fields?: ExpenseTrackerFieldPolicy;
  };
  ExpenseTrackerConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ExpenseTrackerConnectionKeySpecifier | (() => undefined | ExpenseTrackerConnectionKeySpecifier);
    fields?: ExpenseTrackerConnectionFieldPolicy;
  };
  ExpenseTrackerEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ExpenseTrackerEdgeKeySpecifier | (() => undefined | ExpenseTrackerEdgeKeySpecifier);
    fields?: ExpenseTrackerEdgeFieldPolicy;
  };
  ExpenseTrackerResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ExpenseTrackerResponseKeySpecifier | (() => undefined | ExpenseTrackerResponseKeySpecifier);
    fields?: ExpenseTrackerResponseFieldPolicy;
  };
  ExpenseTrackerSuccessResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ExpenseTrackerSuccessResponseKeySpecifier | (() => undefined | ExpenseTrackerSuccessResponseKeySpecifier);
    fields?: ExpenseTrackerSuccessResponseFieldPolicy;
  };
  GenericCategoryResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | GenericCategoryResponseKeySpecifier | (() => undefined | GenericCategoryResponseKeySpecifier);
    fields?: GenericCategoryResponseFieldPolicy;
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
  PageInfo?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | PageInfoKeySpecifier | (() => undefined | PageInfoKeySpecifier);
    fields?: PageInfoFieldPolicy;
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
  UserEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UserEdgeKeySpecifier | (() => undefined | UserEdgeKeySpecifier);
    fields?: UserEdgeFieldPolicy;
  };
  UserResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UserResponseKeySpecifier | (() => undefined | UserResponseKeySpecifier);
    fields?: UserResponseFieldPolicy;
  };
  UserSuccessResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UserSuccessResponseKeySpecifier | (() => undefined | UserSuccessResponseKeySpecifier);
    fields?: UserSuccessResponseFieldPolicy;
  };
  UsersConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UsersConnectionKeySpecifier | (() => undefined | UsersConnectionKeySpecifier);
    fields?: UsersConnectionFieldPolicy;
  };
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;
