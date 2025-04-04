// src/hooks/use-delete-category.ts
import { useDeleteCategoryMutation, CategoryType } from '../graphql/graphql-generated';

interface UseDeleteCategoryOptions {
  type: 'tag' | 'mode' | 'fynix';
  onCompleted?: () => void;
  onError?: (error: any) => void;
}

// Map from component types to GraphQL enum values
const categoryTypeMap = {
  tag: CategoryType.ExpenseTag,
  mode: CategoryType.ExpenseMode,
  fynix: CategoryType.ExpenseFynix,
};

export const useDeleteCategory = ({ type, onCompleted, onError }: UseDeleteCategoryOptions) => {
  // Use the generic deleteCategory mutation
  const [deleteCategory, { loading, error }] = useDeleteCategoryMutation({
    onCompleted: () => {
      onCompleted?.();
    },
    onError: (err) => {
      onError?.(err);
    },
  });

  // Handle the delete operation based on type
  const handleDeleteCategory = (id: string) => {
    if (!id) return;

    // Convert the component type string to the corresponding GraphQL enum value
    const category_type = categoryTypeMap[type];

    // Call the generic mutation with type and id
    deleteCategory({
      variables: {
        input: {
          category_type,
          id,
        },
      },
    });
  };

  return { handleDeleteCategory, loading, error };
};
