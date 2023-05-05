import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EventIcon from '@mui/icons-material/Event';
import BarChartIcon from '@mui/icons-material/BarChart';

const menuItems = [
  "Customers",
  "Trainings",
  "Calendar",
  "Statistics",
];

type Props = {
  open: boolean,
  closeDrawer: () => void,
  changeCurrentPage: (value: string) => void,
}

function MenuDrawer({ open, closeDrawer, changeCurrentPage }: Props) {
  return (
    <Drawer anchor="top" open={open} onClose={closeDrawer}>
      <List>
        {menuItems.map((text) => (
          <ListItem key={text} disablePadding onClick={() => changeCurrentPage(text)}>
            <ListItemButton>
              <ListItemIcon>
                {text === "Customers" ? <PeopleIcon /> : text === "Trainings" ? <FitnessCenterIcon /> : text === "Calendar" ? <EventIcon /> : <BarChartIcon />}
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