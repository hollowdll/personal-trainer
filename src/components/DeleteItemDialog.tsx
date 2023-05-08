// Dialog to delete items, such as customers and trainings.

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
  itemName: string,
}

function DeleteItemDialog({ deleteItem, itemId, itemName }: Props) {
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
        <DialogTitle>{`Delete this ${itemName}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`This ${itemName} will be deleted and will no longer be available.`}
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