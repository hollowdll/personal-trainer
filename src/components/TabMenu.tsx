import { useState } from 'react';
import { AppBar, Tabs, Tab } from '@mui/material';
import CustomerList from './CustomerList';
import TrainingList from './TrainingList';

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
        </Tabs>
      </AppBar>
      {value === "customers" && <CustomerList />}
      {value === "trainings" && <TrainingList />}
    </>
  );
}

export default TabMenu;