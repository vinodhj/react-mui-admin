import { useMemo } from 'react';
import { useExpenseFynixesQuery, useExpenseModesQuery, useExpenseTagsQuery } from '../graphql/graphql-generated';

export const useExpenseFormData = () => {
  const {
    data: tagsData,
    loading: tagsLoading,
    error: tagsError,
  } = useExpenseTagsQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });
  const {
    data: modesData,
    loading: modesLoading,
    error: modesError,
  } = useExpenseModesQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });
  const {
    data: fynixData,
    loading: fynixLoading,
    error: fynixError,
  } = useExpenseFynixesQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  const isLoading = tagsLoading || modesLoading || fynixLoading;
  // Consolidate errors
  const errors = useMemo(() => {
    return [
      tagsError && `Tags error: ${tagsError.message}`,
      modesError && `Modes error: ${modesError.message}`,
      fynixError && `Fynix error: ${fynixError.message}`,
    ].filter(Boolean);
  }, [tagsError, modesError, fynixError]);

  const optionsLoaded = !!fynixData && !!tagsData && !!modesData;

  return {
    tagsData: tagsData?.expenseTags || [],
    modesData: modesData?.expenseModes || [],
    fynixData: fynixData?.expenseFynixes || [],
    isLoading,
    errors,
    optionsLoaded,
  };
};
