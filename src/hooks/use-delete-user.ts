import { useDeleteUserMutation } from '../graphql/graphql-generated';

interface UseDeleteUserOptions {
  onCompleted?: () => void;
  onError?: (error: any) => void;
}

export const useDeleteUser = ({ onCompleted, onError }: UseDeleteUserOptions = {}) => {
  const [deleteUser, { loading, error }] = useDeleteUserMutation({
    onCompleted: () => {
      onCompleted?.();
    },
    onError: (err) => {
      onError?.(err);
    },
  });

  const handleDeleteUser = (id: string) => {
    if (!id) return;
    deleteUser({ variables: { id } });
  };

  return { handleDeleteUser, loading, error };
};
