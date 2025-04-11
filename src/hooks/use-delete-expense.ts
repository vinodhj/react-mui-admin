import { useDeleteExpenseTrackerMutation } from '../graphql/graphql-generated';

interface UseDeleteExpenseOptions {
  user_id: string;
  onCompleted?: () => void;
  onError?: (error: any) => void;
}

export const useDeleteExpense = ({ user_id, onCompleted, onError }: UseDeleteExpenseOptions) => {
  // Use the generic deleteExpense mutation
  const [deleteExpense, { loading, error }] = useDeleteExpenseTrackerMutation({
    onCompleted: () => {
      onCompleted?.();
    },
    onError: (err) => {
      onError?.(err);
    },
  });

  // Handle the delete operation based on type
  const handleDeleteExpense = (id: string) => {
    if (!id) return;

    // Call the generic mutation with type and id
    deleteExpense({
      variables: {
        input: {
          id,
          user_id,
        },
      },
    });
  };

  return { handleDeleteExpense, loading, error };
};
