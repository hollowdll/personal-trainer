import { useState, MouseEvent, SyntheticEvent } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
  DialogContentText,
  Snackbar,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { API_HOST_URL } from "../utils/const";

function OptionsMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const optionsOpen = Boolean(anchorEl);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [dialogAction, setDialogAction] = useState("");
  const [currentMenuItem, setCurrentMenuItem] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleClickOptionsOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseOptions = () => {
    setAnchorEl(null);
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
    handleCloseOptions();
  }

  const handleDialogAction = () => {
    if (currentMenuItem === "Reset Database") {
      resetDatabase();
      handleCloseDialog();
      handleCloseOptions();
    }
  }

  const handleCloseNotification = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotificationOpen(false);
  };

  const handleMenuItemClick = (item: string) => {
    if (item === "Reset Database") {
      setCurrentMenuItem(item);
      setDialogTitle("Reset database?");
      setDialogContent("If there is no data, doing this will restore default data. Use this with caution, as all the entries you have added will be reset as well.");
      setDialogAction("Reset");
      setDialogOpen(true);
      handleCloseOptions();
    }
  }

  const resetDatabase = () => {
    fetch(`${API_HOST_URL}/reset`, {
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Fetch failed: " + response.statusText);
        }
        setNotificationMessage("Database reset successfully!");
        setNotificationOpen(true);
        console.log("Database reset successfully");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Tooltip title="Options">
        <IconButton color="inherit" onClick={handleClickOptionsOpen}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu open={optionsOpen} onClose={handleCloseOptions} anchorEl={anchorEl}>
        <MenuItem onClick={() => handleMenuItemClick("Reset Database")}>Reset Database</MenuItem>
      </Menu>
      <Dialog onClose={handleCloseDialog} open={dialogOpen}>
        <DialogTitle>{`${dialogTitle}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`${dialogContent}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogAction}>{`${dialogAction}`}</Button>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={notificationOpen}
        autoHideDuration={5000}
        onClose={handleCloseNotification}
        message={notificationMessage}
      />
    </>
  );
}

export default OptionsMenu;
