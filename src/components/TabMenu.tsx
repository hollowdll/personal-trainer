import { useState } from 'react';
import { AppBar, Tabs, Tab } from '@mui/material';
import CustomerList from './CustomerList';
import TrainingList from './TrainingList';
import TrainingCalendar from './TrainingCalendar';

function TabMenu() {
  const [value, setValue] = useState("customers");

  const handleChange = (_event: React.SyntheticEvent, value: string) => {
    setValue(value);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} textColor="inherit">
          <Tab value="customers" label="Customers" />
          <Tab value="trainings" label="Trainings" />
          <Tab value="calendar" label="Calendar" />
        </Tabs>
      </AppBar>
      {value === "customers" && <CustomerList />}
      {value === "trainings" && <TrainingList />}
      {value === "calendar" && <TrainingCalendar />}
    </>
  );
}

export default TabMenu;