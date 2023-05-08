import { useState, ChangeEvent } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  TextField,
  IconButton,
  Button,
  Tooltip,
} from '@mui/material';
import { ValueGetterParams } from "ag-grid-community";
import { Customer } from "../../types/customer";

import EditIcon from "@mui/icons-material/Edit";

type Props = {
  updateCustomer: (customer: Customer) => void,
  params: ValueGetterParams<Customer>,
}

function EditCustomer({ updateCustomer, params }: Props) {
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
    params.data ? updateCustomer(customer) : console.log("Failed to load customer data");
    handleClose();
  }

  const inputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  }

  const handleClickOpen = () => {
    params.data ? setCustomer({
      id: params.data.id,
      firstname: params.data.firstname,
      lastname: params.data.lastname,
      streetaddress: params.data.streetaddress,
      postcode: params.data.postcode,
      city: params.data.city,
      email: params.data.email,
      phone: params.data.phone,
    }) : console.log("Failed to load customer data");
    setDialogOpen(true);
  }

  return (
    <div>
      <Tooltip title="Edit">
        <IconButton onClick={handleClickOpen} color="primary">
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog onClose={handleClose} open={dialogOpen}>
        <DialogTitle>Edit Customer</DialogTitle>
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

export default EditCustomer;