import { DocumentNode } from '@apollo/client';
import * as RawDocs from '../persisted-queries/graphql';

interface PersistedDocumentNode extends DocumentNode {
  __meta__?: {
    hash: string;
  };
}

// Helper function that wraps a DocumentNode and reattaches the __meta__ property
function wrapPersistedDocument<T extends DocumentNode>(doc: T): T & PersistedDocumentNode {
  const wrapped = { ...doc } as T & PersistedDocumentNode;
  const meta = (doc as any).__meta__;
  if (meta) {
    Object.defineProperty(wrapped, '__meta__', {
      value: meta,
      writable: false,
      configurable: false,
      enumerable: false,
    });
  }
  return wrapped;
}

// List the documents you want to wrap. For example:
export const AllUsersDocument = wrapPersistedDocument(RawDocs.AllUsersDocument);
export const ChangePasswordDocument = wrapPersistedDocument(RawDocs.ChangePasswordDocument);
export const CreateUserDocument = wrapPersistedDocument(RawDocs.CreateUserDocument);
export const DeleteUserDocument = wrapPersistedDocument(RawDocs.DeleteUserDocument);
export const EditUserDocument = wrapPersistedDocument(RawDocs.EditUserDocument);
export const LogOutDocument = wrapPersistedDocument(RawDocs.LogOutDocument);
export const LoginDocument = wrapPersistedDocument(RawDocs.LoginDocument);
export const UserByFieldDocument = wrapPersistedDocument(RawDocs.UserByFieldDocument);
