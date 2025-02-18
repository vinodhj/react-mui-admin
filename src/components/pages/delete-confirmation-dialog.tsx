import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
interface DeleteConfirmationDialogProps {
  openDialog: boolean;
  handleDelete: () => void;
  handleCloseDialog: () => void;
  deleteLoading: boolean;
}

const DeleteConfirmationDialog = ({ openDialog, handleDelete, handleCloseDialog, deleteLoading }: DeleteConfirmationDialogProps) => (
  <Dialog open={openDialog} onClose={handleCloseDialog} slotProps={{ paper: { sx: { p: 0, minWidth: '25%', borderRadius: 4 } } }}>
    <DialogTitle>Confirm Deletion</DialogTitle>
    <Divider />
    <DialogContent>
      <p>Are you sure you want to delete?</p>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleDelete} disabled={deleteLoading} variant="contained" sx={{ backgroundColor: 'red', borderRadius: 2 }}>
        {deleteLoading ? 'Deleting...' : 'Delete'}
      </Button>
      <Button variant="contained" onClick={handleCloseDialog} sx={{ borderRadius: 2 }}>
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteConfirmationDialog;
