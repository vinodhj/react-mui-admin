import { useTheme } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { tokens } from '../../theme/main-theme';

interface UserActionsMenuProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const UserActionsMenu = ({ anchorEl, handleClose, onView, onEdit, onDelete }: UserActionsMenuProps) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);

  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem onClick={onView} sx={{ display: 'flex', alignItems: 'center', color: colors.primary[100], width: '100%' }}>
        <VisibilityIcon sx={{ color: colors.primary[100], mr: 1 }} />
        View
      </MenuItem>
      <MenuItem onClick={onEdit} sx={{ display: 'flex', alignItems: 'center', color: colors.primary[100], width: '100%' }}>
        <EditIcon sx={{ color: colors.primary[100], mr: 1 }} />
        Edit
      </MenuItem>
      <MenuItem onClick={onDelete} sx={{ display: 'flex', alignItems: 'center', color: colors.redAccent[400], width: '100%' }}>
        <DeleteIcon sx={{ color: colors.redAccent[400], mr: 1 }} />
        Delete
      </MenuItem>
    </Menu>
  );
};

export default UserActionsMenu;
