import { CategoryType } from '../../graphql/graphql-generated';

// Define valid category types as a const array for better type safety
export const VALID_CATEGORY_TYPES = ['tag', 'mode', 'fynix'] as const;
export type ValidCategoryType = typeof VALID_CATEGORY_TYPES[number];

// Map from component types to GraphQL enum values
export const categoryTypeMap: Record<ValidCategoryType, CategoryType> = {
  tag: CategoryType.ExpenseTag,
  mode: CategoryType.ExpenseMode,
  fynix: CategoryType.ExpenseFynix,
};

// Type guard to check if a string is a valid category type
export const isValidCategoryType = (type: string | undefined): type is ValidCategoryType => {
  return type !== undefined && VALID_CATEGORY_TYPES.includes(type as ValidCategoryType);
};

// Helper function to capitalize strings
export const capitalize = (s?: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');
