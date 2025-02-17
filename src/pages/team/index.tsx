import { useAllUsersQuery } from '../../graphql/graphql-generated';
import PageHeader from '../../components/page-header';
import DataTable from '../../components/data-table';
import LoadingSpinner from '../../components/common/loading-spinner';
import ErrorAlert from '../../components/common/error-alert';
import InfoAlert from '../../components/common/info-alert';

import Box from '@mui/material/Box';
import { GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';

function Team() {
  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'Id', width: 50 },
      { field: 'registeredId', headerName: 'Registered Id', width: 200 },
      {
        field: 'name',
        headerName: 'Name',
        cellClassName: 'name-column--cell',
        width: 200,
      },
      { field: 'email', headerName: 'Email', width: 200 },
      { field: 'role', headerName: 'Role', width: 100 },
      { field: 'created_at', headerName: 'Created At', width: 250 },
      { field: 'updated_at', headerName: 'Updated At', width: 250 },
    ],
    []
  );

  const { data, loading, error } = useAllUsersQuery();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error.message} />;
  }

  if (!data?.users) {
    return <InfoAlert message="No data available" />;
  }

  const usersData = data.users?.map((user, index) => ({
    id: index + 1,
    registeredId: user!.id,
    name: user!.name,
    email: user!.email,
    role: user!.role,
    created_at: user!.created_at,
    updated_at: user!.updated_at,
  }));

  return (
    <Box sx={{ m: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <PageHeader
          title="MANAGE TEAM"
          subtitle="A centralized module for efficient team oversight—add or remove members, assign roles, and monitor performance all in one streamlined interface"
        />
      </Box>
      <DataTable rows={usersData} columns={columns} />
    </Box>
  );
}

export default Team;
