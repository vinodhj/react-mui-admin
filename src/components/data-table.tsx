import { FC } from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../theme/main-theme';

interface DataTableProps {
  rows: any[];
  columns: GridColDef[];
  paginationModel?: { page: number; pageSize: number };
  pageSizeOptions?: number[];
}

const DataTable: FC<DataTableProps> = ({ rows, columns, paginationModel = { page: 0, pageSize: 50 }, pageSizeOptions = [50, 100] }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { page, pageSize } = paginationModel;

  return (
    <Box
      width="100%"
      height="80vh"
      sx={{
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
      {/* paginationMode -> need to check and tweaks */}
      <DataGrid
        rowCount={rows.length} // -> If you're using server-side pagination, you must pass the total row count (rowCount).
        rows={rows}
        columns={columns}
        paginationMode="server" // server or client
        initialState={{ pagination: { paginationModel: { page, pageSize } } }}
        pageSizeOptions={pageSizeOptions}
        slots={{ toolbar: GridToolbar }}
        checkboxSelection
        sx={{ border: 0, '--DataGrid-containerBackground': colors.blueAccent[700] }}
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
