import { useAllUsersQuery } from '../../graphql/graphql-generated';
import PageHeader from '../../components/page-header';
import DataTable from '../../components/data-table';
import LoadingSpinner from '../../components/common/loading-spinner';
import ErrorAlert from '../../components/common/error-alert';
import InfoAlert from '../../components/common/info-alert';
import { Link as RouterLink } from 'react-router-dom';
import { tokens } from '../../theme/main-theme';

import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { GridColDef } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import { Button, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

function Team() {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, userId: string) => {
    setAnchorEl(event.currentTarget as unknown as HTMLElement);
    setSelectedUserId(userId);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            style={{ color: colors.greenAccent[400], fontWeight: 'bold', textDecoration: 'none' }}
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

  const { data, loading, error } = useAllUsersQuery({
    fetchPolicy: 'cache-and-network', // using cached data first while fetching fresh data in the background
  });

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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <PageHeader
          title="MANAGE TEAM"
          subtitle="A centralized module for efficient team oversight—add or remove members, assign roles, and monitor performance all in one streamlined interface"
        />
        <Button
          variant="contained"
          component={RouterLink}
          to="/team/create"
          sx={{
            borderRadius: '8px',
            backgroundColor: colors.primary[100],
            color: colors.blackWhite[100],
            textTransform: 'none',
            '&:hover': {
              backgroundColor: colors.greenAccent[300],
            },
          }}
        >
          + New User
        </Button>
      </Box>
      <DataTable rows={usersData} columns={columns} />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>
          <Link
            component={RouterLink}
            to={`/team/${selectedUserId}`}
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: colors.primary[100], width: '100%' }}
            onClick={handleClose}
          >
            <VisibilityIcon sx={{ color: colors.primary[100], mr: 1 }} />
            View
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            component={RouterLink}
            to={`/team/edit/${selectedUserId}`}
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: colors.primary[100], width: '100%' }}
            onClick={handleClose}
          >
            <EditIcon sx={{ color: colors.primary[100], mr: 1 }} /> Edit
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            component={RouterLink}
            to={`/team/delete/${selectedUserId}`}
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: colors.redAccent[600], width: '100%' }}
            onClick={handleClose}
          >
            <DeleteIcon sx={{ color: colors.redAccent[600], mr: 1 }} /> Delete
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default Team;
