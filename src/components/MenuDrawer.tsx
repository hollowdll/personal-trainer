import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EventIcon from "@mui/icons-material/Event";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useNavigate } from "react-router-dom";

const menuItems = ["Customers", "Trainings", "Calendar", "Statistics"];

type Props = {
  open: boolean;
  closeDrawer: () => void;
};

function MenuDrawer({ open, closeDrawer }: Props) {
  const navigate = useNavigate();
  
  const changePage = (text: string) => {
    let route = "/";

    if (text === "Customers") {
      route = "/customers";
    } else if (text === "Trainings") {
      route = "/trainings";
    } else if (text === "Calendar") {
      route = "/calendar";
    } else if (text === "Statistics") {
      route = "/statistics";
    }

    closeDrawer();
    navigate(route);
  }

  return (
    <Drawer anchor="top" open={open} onClose={closeDrawer}>
      <List>
        {menuItems.map((text) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => changePage(text)}
          >
            <ListItemButton>
              <ListItemIcon>
                {text === "Customers" ? (
                  <PeopleIcon />
                ) : text === "Trainings" ? (
                  <FitnessCenterIcon />
                ) : text === "Calendar" ? (
                  <EventIcon />
                ) : (
                  <BarChartIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default MenuDrawer;
