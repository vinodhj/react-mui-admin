import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import InputAdornment from '@mui/material/InputAdornment';
import { alpha } from '@mui/material/styles'; // for semi-transparent backgrounds
import ReadOnlySearchField from './read-only-search-field';
import { SearchTokens, tokens } from '../theme/main-theme';
import { Link as RouterLink, useLocation } from 'react-router-dom';

interface SearchOption {
  label: string;
  path: string;
}

const SEARCH_OPTIONS: SearchOption[] = [
  { label: 'App', path: '/dashboard' },
  { label: 'Team', path: '/team' },
  { label: 'Tracker Expense', path: '/form' },
];

const SearchDialog: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);
  const searchTokens = SearchTokens(mode);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Ref for the TextField inside the dialog
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearch(''); // clear search on close
  };

  // Cmd+K / Ctrl+K to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter the list by user input
  const filteredOptions = SEARCH_OPTIONS.filter(
    (option) => option.label.toLowerCase().includes(search.toLowerCase()) || option.path.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Trigger for opening dialog */}
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
            },
          },
          transition: {
            onEntered: () => {
              inputRef.current && inputRef.current.focus();
            },
          },
        }}
      >
        <DialogContent sx={{ mb: 0, p: 0 }}>
          {/* STICKY HEADER */}
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              backgroundColor: searchTokens.primary[200],
              p: 2,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <TextField
              inputRef={inputRef}
              autoFocus
              fullWidth
              variant="outlined"
              label="Search"
              placeholder="What are you looking for?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                // Default (unfocused) label color
                '& .MuiFormLabel-root': {
                  color: colors.grey[50],
                },
                // Label color when focused or hovered
                '& .MuiFormLabel-root.Mui-focused': {
                  color: colors.greenAccent[400],
                },
                //input text color:
                '& .MuiOutlinedInput-root': {
                  color: colors.grey[50],
                },
                // The border color on hover/focus
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.grey[100],
                },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        onClick={handleClose}
                        variant="text"
                        size="small"
                        sx={{
                          color: 'inherit',
                          backgroundColor: colors.grey[900],
                          borderRadius: 1.5,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            borderRadius: 1.5,
                            color: mode === 'dark' ? 'inherit' : colors.grey[100],
                            backgroundColor: colors.grey[900],
                          }}
                        >
                          ESC
                        </Typography>
                      </Button>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          {/* SCROLLABLE LIST AREA */}
          <Box
            sx={{
              maxHeight: '60vh',
              overflowY: 'auto',
              p: 1,
              backgroundColor: searchTokens.primary[200], // change dynamatically
              // Example: custom scrollbar colors from tokens
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
                filteredOptions.map((option) => {
                  // Check if the current path matches option.path
                  const isActive = location.pathname === option.path;
                  return (
                    <ListItem
                      component={RouterLink}
                      to={option.path}
                      onClick={handleClose}
                      key={option.label}
                      sx={{
                        color: 'inherit',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        border: `2px dotted transparent`,
                        '&:hover': {
                          backgroundColor: alpha(colors.greenAccent[400], 0.2),
                          borderColor: colors.greenAccent[400],
                          borderRadius: 2,
                        },
                        mb: 0,
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle1" sx={{ color: isActive ? colors.greenAccent[400] : 'inherit' }}>
                          {option.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ color: isActive ? colors.greenAccent[400] : 'inherit' }}>
                          {option.path}
                        </Typography>
                      </Box>
                      <Button
                        variant="text"
                        size="small"
                        sx={{
                          borderRadius: 1.5,
                          backgroundColor: colors.grey[900],
                          color: isActive ? colors.greenAccent[400] : 'inherit',
                        }}
                      >
                        OVERVIEW
                      </Button>
                    </ListItem>
                  );
                })
              )}
            </List>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchDialog;
