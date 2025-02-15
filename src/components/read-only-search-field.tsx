import React from 'react';
import { TextField, InputAdornment, OutlinedInput, Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface ReadOnlySearchFieldProps {
  onClick?: () => void;
}

const ReadOnlySearchField: React.FC<ReadOnlySearchFieldProps> = ({ onClick }) => {
  return (
    <TextField
      variant="outlined"
      size="small"
      placeholder="Search..."
      // Clicking anywhere opens something, e.g. a search dialog
      onClick={onClick}
      // Basic styling
      sx={{
        cursor: 'pointer',
        '& .MuiOutlinedInput-root': {
          borderRadius: 8,
          backgroundColor: '#fff',
          '& fieldset': {
            borderColor: '#e2e2e2',
          },
          '&:hover fieldset': {
            borderColor: '#ccc',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#ccc',
          },
        },
      }}
      // 1) Use the "input" slot to replace the default <input> with OutlinedInput
      slots={{
        input: OutlinedInput,
      }}
      // 2) Pass all input-related props (including adornments, readOnly) via slotProps
      slotProps={{
        input: {
          readOnly: true, // prevents typing while preserving the normal look
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#007bff', cursor: 'pointer' }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Box
                sx={{
                  border: '1px solid #e2e2e2',
                  borderRadius: 4,
                  backgroundColor: '#fff',
                  px: 1,
                  py: 0.25,
                }}
              >
                <Typography variant="body2" sx={{ fontSize: '0.8rem', cursor: 'pointer' }}>
                  ⌘K
                </Typography>
              </Box>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default ReadOnlySearchField;
