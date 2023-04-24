import { useState, ChangeEvent } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Dialog,
  Button
} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";

import { Training } from "../types/training";

function AddTraining() {
  const [training, setTraining] = useState<Training>({
    id: 0,
    date: "",
    duration: 0,
    activity: "",
    customer: null,
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClose = () => {
    setDialogOpen(false);
  }

  const handleSave = () => {
    handleClose();
  }

  const inputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  }

  const handleClickOpen = () => {
    setDialogOpen(true);
  }

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        startIcon={<AddIcon />}
      >
        Add Training
      </Button>
      <Dialog onClose={handleClose} open={dialogOpen}>
        <DialogTitle>Add Training</DialogTitle>
        <DialogContent>
          <TextField
            name="date"
            value={training.date}
            label="Date"
            margin="dense"
            onChange={inputChanged}
            fullWidth={true}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddTraining;