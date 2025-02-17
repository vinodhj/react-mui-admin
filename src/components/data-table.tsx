import { FC } from 'react';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../theme/main-theme';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid/components';

interface DataTableProps {
  rows: any[];
  columns: GridColDef[];
  paginationModel?: { page: number; pageSize: number };
  pageSizeOptions?: number[];
}

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarColumnsButton />
    <GridToolbarFilterButton />
    <GridToolbarDensitySelector />
    <GridToolbarExport printOptions={{ disableToolbarButton: true }} /> {/* Disables Print */}
  </GridToolbarContainer>
);

const DataTable: FC<DataTableProps> = ({ rows, columns, paginationModel = { page: 0, pageSize: 50 }, pageSizeOptions = [50, 100] }) => {
  const theme = useTheme();
  const colorMode = theme.palette.mode;
  const colors = tokens(colorMode);
  const { page, pageSize } = paginationModel;

  return (
    <Box
      width="100%"
      height="80vh"
      sx={{
        '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
          outline: 'none !important',
        },
        '& .MuiDataGrid-root': {
          border: 'none',
        },
        '& .MuiDataGrid-cell': {
          borderBottom: 'none',
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: colors.blueAccent[700],
          borderBottom: 'none',
        },
        '& .MuiDataGrid-virtualScroller': {
          backgroundColor: colorMode === 'dark' ? colors.primary[400] : colors.blackWhite[300],
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
      {/* paginationMode -> need to check and tweaks */}
      <DataGrid
        rowCount={rows.length} // -> If you're using server-side pagination, you must pass the total row count (rowCount).
        rows={rows}
        columns={columns}
        paginationMode="server" // server or client
        initialState={{ pagination: { paginationModel: { page, pageSize } } }}
        pageSizeOptions={pageSizeOptions}
        // slots={{ toolbar: GridToolbar }}
        slots={{ toolbar: CustomToolbar }} // Use the custom toolbar here
        checkboxSelection
        sx={{
          boxShadow: 5,
          border: 1,
          '--DataGrid-containerBackground': colors.blueAccent[700],
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: {
              debounceMs: 200,
              sx: {
                width: '300px',
                fontSize: '1rem',
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default DataTable;
