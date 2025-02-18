import React from 'react';
import { useTheme } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles/';
import SearchIcon from '@mui/icons-material/Search';
// If you have custom tokens:
import { tokens } from '../theme/main-theme';

interface ReadOnlySearchFieldProps {
  onClick?: () => void;
}

const ReadOnlySearchField: React.FC<ReadOnlySearchFieldProps> = ({ onClick }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);

  return (
    <TextField
      variant="outlined"
      size="small"
      placeholder="Search..."
      onClick={onClick}
      slots={{
        input: OutlinedInput,
      }}
      // Pass props to the OutlinedInput
      slotProps={{
        input: {
          onMouseDown: (e) => e.preventDefault(),
          sx: {
            cursor: 'pointer',
          },
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{
                  color: colors.primary[100],
                  cursor: 'pointer',
                }}
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Box
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 4,
                  backgroundColor: colors.blackWhite[300],
                  px: 1,
                  py: 0.25,
                  cursor: 'pointer',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.8rem',
                    color: colors.primary[100],
                  }}
                >
                  ⌘K
                </Typography>
              </Box>
            </InputAdornment>
          ),
        },
      }}
      sx={{
        cursor: 'pointer',
        '& .MuiOutlinedInput-root': {
          borderRadius: 10,
          backgroundColor: colors.blackWhite[300],
          '&:hover fieldset': {
            borderColor: alpha(colors.primary[100], 0.4),
          },
          '&.Mui-focused fieldset': {
            borderColor: alpha(colors.primary[100], 0.4),
          },
        },
        // Target the inner input element specifically and use !important
        '& .MuiOutlinedInput-input': {
          cursor: 'pointer !important',
        },
      }}
    />
  );
};

export default ReadOnlySearchField;
