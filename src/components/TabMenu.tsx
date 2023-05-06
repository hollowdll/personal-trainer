import { useState } from "react";
import { AppBar, Typography, Toolbar, IconButton, Tooltip } from "@mui/material";
import CustomerList from "./CustomerList";
import TrainingList from "./TrainingList";
import TrainingCalendar from "./TrainingCalendar";
import TrainingStatistics from "./TrainingStatistics";
import MenuIcon from "@mui/icons-material/Menu";
import MenuDrawer from "./MenuDrawer";
import OptionsMenu from "./OptionsMenu";

function TabMenu() {
  const [currentPage, setCurrentPage] = useState("Customers");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const changeCurrentPage = (value: string) => {
    setCurrentPage(value);
    closeDrawer();
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
          <MenuDrawer
            open={drawerOpen}
            closeDrawer={closeDrawer}
            changeCurrentPage={changeCurrentPage}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            Personal Trainer
          </Typography>
          <OptionsMenu />
        </Toolbar>
      </AppBar>
      {currentPage === "Customers" && <CustomerList />}
      {currentPage === "Trainings" && <TrainingList />}
      {currentPage === "Calendar" && <TrainingCalendar />}
      {currentPage === "Statistics" && <TrainingStatistics />}
    </>
  );
}

export default TabMenu;
