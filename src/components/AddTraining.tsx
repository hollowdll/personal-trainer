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

import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { enUS } from "date-fns/locale";

import { Training } from "../types/training";
import { parseISO } from "date-fns";

function AddTraining() {
  const [training, setTraining] = useState<Training>({
    id: 0,
    date: "",
    duration: 0,
    activity: "",
    customer: null,
  });
  const [customerId, setCustomerId] = useState<number | string>(0);
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

  // Transform date text to ISO format
  const transformDate = (dateText: Date | null) => {
    if (dateText != null) {
      try {
        const transformDate = dateText.toISOString()
        setTraining({ ...training, date: transformDate })
      } catch(err) {
        console.error(err);
      }
    }
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
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
            <DateTimePicker
              label="Date"
              value={parseISO(training.date)}
              sx={{
                marginTop: "10px",
                marginBottom: "5px",
                width: "100%"
              }}
              onChange={(newValue) => transformDate(newValue)}
            />
          </LocalizationProvider>
          <TextField
            name="duration"
            value={training.duration}
            label="Duration in minutes"
            margin="dense"
            onChange={inputChanged}
            fullWidth={true}
          />
          <TextField
            name="activity"
            value={training.activity}
            label="Activity"
            margin="dense"
            onChange={inputChanged}
            fullWidth={true}
          />
          <TextField
            name="customerId"
            value={customerId}
            label="Customer ID"
            margin="dense"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setCustomerId(event.target.value)}
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