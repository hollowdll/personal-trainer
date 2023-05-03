import { useState } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
  DialogContentText,
  Tooltip,
  IconButton
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  deleteItem: (itemId: number) => void,
  itemId: number,
}

function DeleteItemDialog({ deleteItem, itemId }: Props) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  const handleDelete = () => {
    deleteItem(itemId);
    handleClose();
  }

  const handleClickOpen = () => {
    setOpen(true);
  }

  return (
    <>
      <Tooltip title="Delete">
        <IconButton onClick={handleClickOpen} color="error">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Delete this item?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This item will be deleted and will no longer be available.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteItemDialog;