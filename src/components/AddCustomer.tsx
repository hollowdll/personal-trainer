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
import { Customer } from "../types/customer";

type Props = {
  addCustomer: (customer: Customer) => void,
}

function AddCustomer({ addCustomer }: Props) {
  const [customer, setCustomer] = useState<Customer>({
    id: 0,
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClose = () => {
    setDialogOpen(false);
  }

  const handleSave = () => {
    addCustomer(customer);
    handleClose();
  }

  const inputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  }

  const handleClickOpen = () => {
    setDialogOpen(true);
  }

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        startIcon={<AddIcon />}
      >
        Add Customer
      </Button>
      <Dialog onClose={handleClose} open={dialogOpen}>
        <DialogTitle>Add Customer</DialogTitle>
        <DialogContent>
          <TextField
            name="firstname"
            value={customer.firstname}
            label="First Name"
            margin="dense"
            onChange={inputChanged}
            fullWidth={true}
          />
          <TextField
            name="lastname"
            value={customer.lastname}
            margin="dense"
            label="Last Name"
            onChange={inputChanged}
            fullWidth={true}
          />
          <TextField
            name="streetaddress"
            value={customer.streetaddress}
            margin="dense"
            label="Street Address"
            onChange={inputChanged}
            fullWidth={true}
          />
          <TextField
            name="postcode"
            margin="dense"
            value={customer.postcode}
            label="Postcode"
            onChange={inputChanged}
            fullWidth={true}
          />
          <TextField
            name="city"
            value={customer.city}
            margin="dense"
            label="City"
            onChange={inputChanged}
            fullWidth={true}
          />
          <TextField
            name="email"
            value={customer.email}
            margin="dense"
            label="Email"
            onChange={inputChanged}
            fullWidth={true}
          />
          <TextField
            name="phone"
            value={customer.phone}
            margin="dense"
            label="Phone"
            onChange={inputChanged}
            fullWidth={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddCustomer;
