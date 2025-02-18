import { useParams } from 'react-router-dom';
import { ColumnName, useUserByFieldQuery } from '../../graphql/graphql-generated';
import ErrorAlert from '../../components/common/error-alert';
import LoadingSpinner from '../../components/common/loading-spinner';
import { formatDate } from '../../utils/date-utils';

function TeamDetails() {
  const { id } = useParams();

  if (!id) {
    return <ErrorAlert message="Invalid Registered ID" />;
  }

  const { data, loading, error } = useUserByFieldQuery({
    variables: {
      field: ColumnName.Id,
      value: id,
    },
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error.message} />;
  }

  const user = data?.userByfield?.[0];

  if (!user) {
    return <ErrorAlert message="User not found" />;
  }

  const { name, email, role, created_at, updated_at } = user;

  return (
    <div>
      <h1>Team Member Details</h1>
      <p>ID: {id}</p>
      <p>Name: {name ?? 'N/A'}</p>
      <p>Email: {email ?? 'N/A'}</p>
      <p>Role: {role ?? 'N/A'}</p>
      <p>Created At: {formatDate(created_at)}</p>
      <p>Last Updated At: {formatDate(updated_at)}</p>
    </div>
  );
}

export default TeamDetails;
