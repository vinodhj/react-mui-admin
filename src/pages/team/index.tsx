import { useAllUsersQuery, useDeleteUserMutation } from '../../graphql/graphql-generated';
import PageHeader from '../../components/pages/page-header';
import DataTable from '../../components/pages/data-table';
import LoadingSpinner from '../../components/common/loading-spinner';
import ErrorAlert from '../../components/common/error-alert';
import InfoAlert from '../../components/common/info-alert';
import { tokens } from '../../theme/main-theme';
import SuccessAlert from '../../components/common/success-alert';
import UserActionsMenu from '../../components/pages/user-actions-menu';
import DeleteConfirmationDialog from '../../components/pages/delete-confirmation-dialog';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { GridColDef } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import { useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NewUserButton from '../../components/pages/new-user-button';

function Team() {
  const navigate = useNavigate();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // GraphQL mutation for deleting a user
  const [deleteUser, { loading: deleteLoading, error: deleteError }] = useDeleteUserMutation({
    onCompleted: () => {
      // Refetch data after deletion
      refetch();
      setOpenDialog(false); // Close the confirmation dialog
      setDeleteSuccess(true); // Set success state to true
      setTimeout(() => setDeleteSuccess(false), 3000);
    },
  });

  const { data, loading, error, refetch } = useAllUsersQuery({
    fetchPolicy: 'cache-and-network', // using cached data first while fetching fresh data in the background
  });

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, userId: string) => {
    setAnchorEl(event.currentTarget as unknown as HTMLElement);
    setSelectedUserId(userId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (selectedUserId) {
      deleteUser({ variables: { id: selectedUserId } });
    }
  };

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'Id', width: 50 },
      {
        field: 'registeredId',
        headerName: 'Registered Id',
        width: 200,
        renderCell: (params) => (
          <Link
            component={RouterLink}
            to={`/team/${params.value}`}
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {params.value}
          </Link>
        ),
      },
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
      {
        field: 'actions',
        headerName: 'Actions',
        width: 100,
        renderCell: (params) => (
          <IconButton
            onClick={(event) => handleClick(event, params.row.registeredId)}
            aria-label="more"
            sx={{
              color: 'inherit',
              border: '1.5px solid ' + colors.greenAccent[400],
              width: 40,
              height: 40,
            }}
          >
            <MoreVertIcon style={{ cursor: 'pointer', color: 'inherit' }} />
          </IconButton>
        ),
      },
    ],
    []
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error.message} />;
  }

  if (deleteError) {
    return <ErrorAlert message={deleteError.message} />;
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
    <Box sx={{ m: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <PageHeader
          title="MANAGE TEAM"
          subtitle="A centralized module for efficient team oversight—add or remove members, assign roles, and monitor performance all in one streamlined interface"
        />

        <NewUserButton to="/team/create" label="+ New User" />
      </Box>
      {deleteSuccess && <SuccessAlert message="User deleted successfully!" />}

      <DataTable rows={usersData} columns={columns} />

      <UserActionsMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        onView={() => {
          handleClose();
          navigate(`/team/${selectedUserId}`);
        }}
        onEdit={() => {
          handleClose();
          // navigate(`/team/edit/${selectedUserId}`);
        }}
        onDelete={() => {
          handleClose();
          setOpenDialog(true);
        }}
      />

      <DeleteConfirmationDialog
        openDialog={openDialog}
        handleDelete={handleDelete}
        handleCloseDialog={() => setOpenDialog(false)}
        deleteLoading={deleteLoading}
      />
    </Box>
  );
}

export default Team;
