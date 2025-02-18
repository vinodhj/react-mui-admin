import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DataTable from '../../components/pages/data-table';
import { GridColDef } from '@mui/x-data-grid';
import '@testing-library/jest-dom';

// Mock theme provider for MUI
const theme = createTheme();

// Sample data for testing
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'age', headerName: 'Age', width: 90 },
];

const rows = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
];

describe('DataTable Component', () => {
  it('renders the DataGrid with provided columns and rows', () => {
    render(
      <ThemeProvider theme={theme}>
        <DataTable rows={rows} columns={columns} />
      </ThemeProvider>
    );

    // Check if column headers are rendered
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();

    // Check if row data is rendered
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });
});
