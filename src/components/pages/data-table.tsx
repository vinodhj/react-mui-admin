import { FC, useState } from 'react';
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

  // Create state for pagination
  const [pageModel, setPageModel] = useState({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
  });

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
        '& .MuiDataGrid-main': {
          borderRight: `1px solid ${colors.grey[900]}`,
          borderLeft: `1px solid ${colors.grey[900]}`,
        },
      }}
    >
      <Box sx={{ minWidth: 1300, height: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          paginationMode="client"
          paginationModel={pageModel}
          onPaginationModelChange={setPageModel}
          pageSizeOptions={pageSizeOptions}
          slots={{ toolbar: CustomToolbar }}
          slotProps={{
            pagination: {
              count: rows.length,
            },
          }}
          disableRowSelectionOnClick
          checkboxSelection
          sx={{
            maxWidth: 1300,
            height: '80vh',
            border: 1,
            '--DataGrid-containerBackground': colors.blueAccent[700],
          }}
        />
      </Box>
    </Box>
  );
};

export default DataTable;
