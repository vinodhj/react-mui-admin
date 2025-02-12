import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridToolbar, GridColDef } from '@mui/x-data-grid';

import mockDataJson from '../../../mock/mock-data-team.json';
import { tokens } from '../../theme/main-theme';
import PageHeader from '../../components/page-header';

function Team() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
  const paginationModel = { page: 0, pageSize: 50 };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <PageHeader
          title="MANAGE TEAM"
          subtitle="A centralized module for efficient team oversight—add or remove members, assign roles, and monitor performance all in one streamlined interface"
        />
      </Box>
      <Box
        m="8px 0 0 0"
        width="100%"
        height="80vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataJson}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[50, 100]}
          slots={{ toolbar: GridToolbar }}
          checkboxSelection
          sx={{ border: 0, '--DataGrid-containerBackground': colors.blueAccent[700] }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: {
                debounceMs: 200,
                sx: {
                  width: '300px', // Adjust width as needed
                  fontSize: '1rem', // Adjust font size if desired
                },
              },
              printOptions: { disableToolbarButton: false },
              csvOptions: { disableToolbarButton: false },
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default Team;
