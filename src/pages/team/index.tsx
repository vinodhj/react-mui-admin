import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import mockDataJson from '../../../mock/mock-data-team.json';
import PageHeader from '../../components/page-header';
import DataTable from '../../components/data-table';

function Team() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 100 },
    { field: 'registrarId', headerName: 'Registrar Id', width: 100 },
    {
      field: 'name',
      headerName: 'Name',
      cellClassName: 'name-column--cell',
      width: 200,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      width: 100,
    },
    { field: 'phone', headerName: 'Phone Number', width: 100 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'address', headerName: 'Address', width: 250 },
    { field: 'city', headerName: 'City', width: 100 },
    { field: 'zipCode', headerName: 'Zip Code', width: 100 },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <PageHeader
          title="MANAGE TEAM"
          subtitle="A centralized module for efficient team oversight—add or remove members, assign roles, and monitor performance all in one streamlined interface"
        />
      </Box>
      <DataTable rows={mockDataJson} columns={columns} />
    </Box>
  );
}

export default Team;
