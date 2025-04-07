// src/hooks/use-delete-category.ts
import { useDeleteCategoryMutation } from '../graphql/graphql-generated';
import { categoryTypeMap, ValidCategoryType } from '../pages/category/category-config';

interface UseDeleteCategoryOptions {
  type: ValidCategoryType;
  onCompleted?: () => void;
  onError?: (error: any) => void;
}

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
