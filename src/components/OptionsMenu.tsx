import { useState, MouseEvent } from "react";
import { Menu, MenuItem, IconButton, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function OptionsMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClickOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <>
      <Tooltip title="Options">
        <IconButton color="inherit" onClick={handleClickOpen}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        <MenuItem onClick={handleClose}>Reset Database</MenuItem>
      </Menu>
    </>
  );
}

export default OptionsMenu;