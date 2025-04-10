import { FC } from 'react';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';

import { tokens } from '../../theme/main-theme';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid/components';

interface DataTableProps {
  rows: any[];
  columns: GridColDef[];
  totalCount: number;
  paginationModel?: { page: number; pageSize: number };
  pageSizeOptions?: number[];
  onPaginationModelChange?: (model: GridPaginationModel) => void;
  loading?: boolean;
  filterComponent?: React.ReactNode;
}

// Function that returns the actual toolbar component
function createToolbar(filterComponent: React.ReactNode) {
  // This function returns a component that accepts GridToolbarProps
  return function CustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 2,
          p: 1,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarQuickFilter debounceMs={200} sx={{ width: '300px', fontSize: '1rem' }} />
        </Box>
        {filterComponent && (
          <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            {filterComponent}
          </Box>
        )}
      </GridToolbarContainer>
    );
  };
}

// Create style object outside component to prevent recreation on each render
const createStyles = (colors: any, colorMode: string) => ({
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
});

const ServerDataTable: FC<DataTableProps> = ({
  rows,
  columns,
  totalCount,
  paginationModel = { page: 0, pageSize: 10 },
  pageSizeOptions = [10, 20],
  onPaginationModelChange,
  loading = false,
  filterComponent,
}) => {
  const theme = useTheme();
  const colorMode = theme.palette.mode;
  const colors = tokens(colorMode);

  // Memoize grid styles
  const gridStyles = createStyles(colors, colorMode);

  // Create the toolbar component with the current filterComponent
  const CustomToolbarComponent = createToolbar(filterComponent);

  return (
    <Box width="100%" height="80vh" overflow={'auto'} sx={gridStyles}>
      {/* paginationMode -> need to check and tweaks */}
      <Box sx={{ width: '100%', maxWidth: 1300, height: '100%' }}>
        <DataGrid
          rowCount={totalCount} // -> If you're using server-side pagination, you must pass the total row count (rowCount).
          rows={rows}
          columns={columns}
          paginationMode="server" // server or client
          initialState={{
            pagination: {
              paginationModel: {
                page: paginationModel.page,
                pageSize: paginationModel.pageSize,
              },
            },
          }}
          pageSizeOptions={pageSizeOptions}
          slots={{
            toolbar: CustomToolbarComponent,
          }}
          disableColumnFilter
          disableRowSelectionOnClick
          checkboxSelection
          onPaginationModelChange={onPaginationModelChange}
          loading={loading}
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
