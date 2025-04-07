import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpenseFynixesQuery, useExpenseModesQuery, useExpenseTagsQuery, Category as CategoryType } from '../graphql/graphql-generated';
import { formatDate } from '../utils/date-utils';
import { isValidCategoryType, capitalize as capitalizeHelper } from '../pages/category/category-config';

// Type configuration with proper TypeScript typing
export const TYPE_CONFIG = {
  tag: {
    useQuery: useExpenseTagsQuery,
    dataKey: 'expenseTags',
  },
  mode: {
    useQuery: useExpenseModesQuery,
    dataKey: 'expenseModes',
  },
  fynix: {
    useQuery: useExpenseFynixesQuery,
    dataKey: 'expenseFynixes',
  },
};

// Define types for our processed data
export interface ProcessedCategoryData {
  id: number;
  registeredId: string;
  name: string;
  created_at: string;
  updated_at: string;
}

// Define return type for the hook
interface UseCategoryDataReturn {
  data: ProcessedCategoryData[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<any>;
  isValidType: boolean;
  capitalize: (s?: string) => string;
}

export function useCategoryData(
  type: string | undefined,
  id?: string | null,
  options: { skipRedirect?: boolean } = {}
): UseCategoryDataReturn {
  const navigate = useNavigate();
  const [error, setError] = useState<Error | null>(null);

  // Check if the type is valid
  const isValidType = isValidCategoryType(type);

  // Handle navigation in useEffect instead of during render
  useEffect(() => {
    if (!isValidType && !options.skipRedirect) {
      navigate('/error', { replace: true, state: { message: `Invalid category type: ${type}` } });
    }
  }, [isValidType, navigate, options.skipRedirect, type]);

  // Get the appropriate query configuration
  const queryConfig = isValidType ? TYPE_CONFIG[type] : null;

  // Set up query variables based on whether we're fetching a list or a single item
  const variables = id ? { categoryFilter: { id } } : {};

  // Run the appropriate query
  const {
    data,
    loading,
    error: queryError,
    refetch,
  } = queryConfig
    ? queryConfig.useQuery({
        variables,
        skip: !isValidType,
        notifyOnNetworkStatusChange: true,
        fetchPolicy: id ? 'network-only' : 'cache-and-network',
      })
    : { data: null, loading: false, error: new Error('Invalid category type'), refetch: () => Promise.resolve() };

  // Handle errors
  useEffect(() => {
    if (queryError && !error) {
      setError(queryError);
    }
  }, [queryError, error]);

  // Process data with useMemo to avoid unnecessary recomputation
  const processedData = useMemo(() => {
    if (!data || !isValidType || !queryConfig) return [];

    const items = data[queryConfig.dataKey as keyof typeof data] ?? [];

    if (!Array.isArray(items)) return [];

    return items
      .map((item: CategoryType | null, index: number) => {
        if (!item) return null;
        return {
          id: index + 1,
          registeredId: item.id,
          name: item.name,
          created_at: formatDate(item.created_at),
          updated_at: formatDate(item.updated_at),
        };
      })
      .filter(Boolean) as ProcessedCategoryData[];
  }, [data, isValidType, queryConfig]);

  return {
    data: processedData,
    loading,
    error: error || queryError || null,
    refetch,
    isValidType,
    capitalize: capitalizeHelper,
  };
}
