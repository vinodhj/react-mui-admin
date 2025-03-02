import { InMemoryCache } from '@apollo/client/cache';
import { StrictTypedTypePolicies } from './apollo-generated-helpers';

const typePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      // For the 'users' query - simple list of users
      // TODO: pagination or incremental loading, you might need to modify the merge function to combine existing and incoming data.
      users: {
        merge(_existing, incoming) {
          return incoming; // Replace with new data on refetch
        },
      },
      // For userByfield query with different field/value combinations
      userByfield: {
        // Cache separately based on both field and value inputs
        keyArgs: ['input.field', 'input.value'],
        merge(_existing, incoming) {
          return incoming;
        },
      },
      // For userByEmail query
      userByEmail: {
        keyArgs: ['input.email'],
        merge(_existing, incoming) {
          return incoming;
        },
      },
      // For adminKvAsset query
      adminKvAsset: {
        keyArgs: (args) => args?.input?.kv_key,
        merge(_existing, incoming) {
          return incoming;
        },
      },
    },
  },
  // Normalize User entities using ID
  User: {
    keyFields: ['id'],
  },
  // Normalize UserResponse entities
  UserResponse: {
    keyFields: ['id'],
  },
  // Normalize UserSuccessResponse entities
  UserSuccessResponse: {
    keyFields: ['id'],
  },
  // Normalize AdminKvAsset entities using kv_key
  AdminKvAsset: {
    keyFields: ['kv_key'],
  },
};

// Cache configuration tailored to your schema
export const cache = new InMemoryCache({
  typePolicies,
});
