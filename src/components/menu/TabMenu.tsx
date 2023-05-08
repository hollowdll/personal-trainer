// App bar that contains menu and options

import { useState } from "react";
import { AppBar, Typography, Toolbar, IconButton, Tooltip } from "@mui/material";
import CustomerList from "../customer/CustomerList";
import TrainingList from "../training/TrainingList";
import TrainingCalendar from "../calendar/TrainingCalendar";
import TrainingStatistics from "../statistic/TrainingStatistics";
import MenuIcon from "@mui/icons-material/Menu";
import MenuDrawer from "./MenuDrawer";
import OptionsMenu from "./OptionsMenu";
import NotFound from "../NotFound";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function TabMenu() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Tooltip title="Menu">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            Personal Trainer
          </Typography>
          <OptionsMenu />
        </Toolbar>
      </AppBar>
      
      <BrowserRouter>
        <MenuDrawer
          open={drawerOpen}
          closeDrawer={closeDrawer}
        />
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingList />} />
          <Route path="/calendar" element={<TrainingCalendar />} />
          <Route path="/statistics" element={<TrainingStatistics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default TabMenu;
