import { FC } from 'react';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';

import { tokens } from '../../theme/main-theme';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
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
    <GridToolbarDensitySelector />
    <GridToolbarQuickFilter debounceMs={200} sx={{ width: '300px', fontSize: '1rem' }} />
  </GridToolbarContainer>
);

const ServerDataTable: FC<DataTableProps> = ({
  rows,
  columns,
  paginationModel = { page: 0, pageSize: 10 },
  pageSizeOptions = [10, 20],
}) => {
  const theme = useTheme();
  const colorMode = theme.palette.mode;
  const colors = tokens(colorMode);
  const { page, pageSize } = paginationModel;

  return (
    <Box
      width="100%"
      height="80vh"
      overflow={'auto'}
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
      <Box sx={{ minWidth: 1300, height: '100%' }}>
        <DataGrid
          rowCount={rows.length} // -> If you're using server-side pagination, you must pass the total row count (rowCount).
          rows={rows}
          columns={columns}
          paginationMode="server" // server or client
          initialState={{ pagination: { paginationModel: { page, pageSize } } }}
          pageSizeOptions={pageSizeOptions}
          slots={{ toolbar: CustomToolbar }} // Use the custom toolbar here
          disableColumnFilter
          disableRowSelectionOnClick
          checkboxSelection
          // Disabling virtualization is fine for smaller data sets, but if you have hundreds or thousands of rows, it can impact performance in normal usage
          disableVirtualization
          sx={{
            maxWidth: 1300,
            height: '80vh',
            boxShadow: 5,
            border: 1,
            '--DataGrid-containerBackground': colors.blueAccent[700],
          }}
        />
      </Box>
    </Box>
  );
};

export default ServerDataTable;
