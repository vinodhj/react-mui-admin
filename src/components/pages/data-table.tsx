import { FC } from 'react';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';

import { tokens } from '../../theme/main-theme';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
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
    <GridToolbarFilterButton />
    <GridToolbarDensitySelector />
    <GridToolbarExport
      printOptions={{
        disableToolbarButton: true,
        hideFooter: true,
        hideToolbar: true,
        pageStyle: `
          @media print {
            @page {
              size: A4 landscape;
              margin: 1cm;
            }

            /* Force black text on white background */
            body,
            .MuiDataGrid-root,
            .MuiDataGrid-root * {
              color: #000 !important;
              background-color: #fff !important;
            }

            /* Expand the grid so all rows/columns appear */
            .MuiDataGrid-main,
            .MuiDataGrid-virtualScroller {
              overflow: visible !important;
              height: auto !important;
              max-height: none !important;
            }

            /* Avoid splitting a row across pages */
            .MuiDataGrid-row {
              break-inside: avoid !important;
              page-break-inside: avoid !important;
            }

            /* Optionally scale down to fit all columns on one page */
            .MuiDataGrid-main {
              transform: scale(0.85);
              transform-origin: top left;
              width: 100%;
            }
          }
        `,
      }}
    />

    <GridToolbarQuickFilter debounceMs={200} sx={{ width: '300px', fontSize: '1rem' }} />
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
          // slots={{ toolbar: GridToolbar }}
          slots={{ toolbar: CustomToolbar }} // Use the custom toolbar here
          // disableColumnFilter -> to disable column filter
          disableRowSelectionOnClick
          checkboxSelection
          // Disabling virtualization is fine for smaller data sets, but if you have hundreds or thousands of rows, it can impact performance in normal usage
          // disableVirtualization
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

export default DataTable;
