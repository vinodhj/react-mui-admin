import { MenuItemStyles } from 'react-pro-sidebar';
import { tokens } from '../../theme/main-theme';

export const getMenuItemStyles = (mode: 'light' | 'dark', colors: ReturnType<typeof tokens>): MenuItemStyles => ({
  button: ({ active }) => ({
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
      color: colors.blueAccent[400],
    },
    color: (() => {
      if (active) return colors.greenAccent[400];
      return mode === 'dark' ? colors.grey[100] : '#333';
    })(),
  }),
  icon: { backgroundColor: 'transparent' },
  label: { backgroundColor: 'transparent' },
});
