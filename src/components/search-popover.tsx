import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  InputAdornment,
  IconButton,
  useTheme,
} from '@mui/material';
import ReadOnlySearchField from './read-only-search-field';
import { tokens } from '../theme/main-theme';

interface SearchOption {
  label: string;
  path: string;
}

const SEARCH_OPTIONS: SearchOption[] = [
  { label: 'App', path: '/dashboard' },
  { label: 'Ecommerce', path: '/dashboard/ecommerce' },
  { label: 'Analytics', path: '/dashboard/analytics' },
  { label: 'Banking', path: '/dashboard/banking' },
  { label: 'Booking', path: '/dashboard/booking' },
  { label: 'File', path: '/dashboard/file' },
  { label: 'App', path: '/dashboard' },
  { label: 'Ecommerce', path: '/dashboard/ecommerce' },
  { label: 'Analytics', path: '/dashboard/analytics' },
  { label: 'Banking', path: '/dashboard/banking' },
  { label: 'Booking', path: '/dashboard/booking' },
  { label: 'File', path: '/dashboard/file' },
  { label: 'App', path: '/dashboard' },
  { label: 'Ecommerce', path: '/dashboard/ecommerce' },
  { label: 'Analytics', path: '/dashboard/analytics' },
  { label: 'Banking', path: '/dashboard/banking' },
  { label: 'Booking', path: '/dashboard/booking' },
  { label: 'File', path: '/dashboard/file' },
  { label: 'App', path: '/dashboard' },
  { label: 'Ecommerce', path: '/dashboard/ecommerce' },
  { label: 'Analytics', path: '/dashboard/analytics' },
  { label: 'Banking', path: '/dashboard/banking' },
  { label: 'Booking', path: '/dashboard/booking' },
  { label: 'File', path: '/dashboard/file' },
];

const SearchDialog: React.FC = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearch(''); // clear search on close
  };

  // Add the keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // For Mac: e.metaKey; for Windows: e.ctrlKey
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter the list by the user's input
  const filteredOptions = SEARCH_OPTIONS.filter(
    (option) => option.label.toLowerCase().includes(search.toLowerCase()) || option.path.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Box onClick={handleOpen} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <ReadOnlySearchField />
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        slotProps={{
          paper: {
            sx: {
              p: 0,
              borderRadius: 5,
              // or any other styles
            },
          },
        }}
      >
        <DialogContent sx={{ mb: 1, p: 0 }}>
          {/* STICKY HEADER */}
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              backgroundColor: '#fff',
              p: 2,
              // If you want a small bottom border:
              borderBottom: '1px solid #ddd',
            }}
          >
            <TextField
              autoFocus
              fullWidth
              variant="outlined"
              label="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button onClick={handleClose} variant="text" size="small" sx={{ backgroundColor: '#eeeff1', borderRadius: 1.5 }}>
                        <Typography variant="body2">esc</Typography>
                      </Button>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <Box
            sx={{
              maxHeight: '60vh',
              overflowY: 'auto',
              p: 1,
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: colors.blackWhite[300],
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: colors.greenAccent[400],
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: colors.greenAccent[400],
              },
            }}
          >
            <List sx={{ mt: 0 }}>
              {filteredOptions.length === 0 ? (
                <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                  No results found.
                </Typography>
              ) : (
                filteredOptions.map((option) => (
                  <ListItem
                    key={option.label}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      // Dotted border is hidden unless hovered:
                      border: '1px dotted transparent',
                      '&:hover': {
                        backgroundColor: '#e0ffe0',
                        borderColor: 'green',
                      },
                      mb: 1, // spacing between items
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1">{option.label}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {option.path}
                      </Typography>
                    </Box>
                    <Button variant="text" size="small" sx={{ backgroundColor: '#eeeff1', borderRadius: 1.5 }}>
                      OVERVIEW
                    </Button>
                  </ListItem>
                ))
              )}
            </List>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchDialog;
