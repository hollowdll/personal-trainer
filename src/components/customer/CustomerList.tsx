import { useState, useEffect, useRef, SyntheticEvent } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Customer } from "../../types/customer";
import { Stack, IconButton, Snackbar } from "@mui/material";
import { ValueGetterParams, GridApi } from "ag-grid-community";

import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import DeleteItemDialog from "../DeleteItemDialog";
import CustomerCsvExport from "./CustomerCsvExport";
import CloseIcon from '@mui/icons-material/Close';

import { API_HOST_URL } from "../../utils/const";
import CircularLoading from "../CircularLoading";

function CustomerList() {
  const [customers, setCustomers] = useState<Array<Customer>>([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const gridRef = useRef<AgGridReact<Customer>>(null);

  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "First Name", field: "firstname" },
    { headerName: "Last Name", field: "lastname" },
    { headerName: "Street Address", field: "streetaddress" },
    { field: "postcode" },
    { field: "city" },
    { field: "email" },
    { field: "phone" },
    // Edit button column
    {
      headerName: "",
      width: 100,
      maxWidth: 125,
      filter: false,
      sortable: false,
      resizable: false,
      cellStyle: { border: "none" },
      cellRenderer: (params: ValueGetterParams<Customer>) => {
        return (
          <EditCustomer updateCustomer={updateCustomer} params={params} />
        );
      }
    },
    // Delete button column
    {
      headerName: "",
      width: 100,
      maxWidth: 125,
      field: "id",
      filter: false,
      sortable: false,
      resizable: false,
      cellStyle: { border: "none" },
      cellRenderer: (params: ValueGetterParams<Customer>) => {
        return (
          <DeleteItemDialog deleteItem={deleteCustomer} itemId={params.getValue("id")} itemName="customer" />
        )
      }
    }
  ];

  const showNotification = (message: string) => {
    setNotificationMessage(message);
    setNotificationOpen(true);
  }

  const handleCloseNotification = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotificationOpen(false);
  };

  // Fetch all customers
  const fetchCustomers = () => {
    fetch(`${API_HOST_URL}/getcustomers`)
      .then(response => {
        if (!response.ok) {
          showNotification("Failed to fetch customers data");
          throw new Error("Fetch failed: " + response.statusText);
        }

        return response.json();
      })
      .then(data => setCustomers(data))
      .catch(err => console.error(err));
  }

  // Add a new customer
  const addCustomer = (customer: Customer) => {
    console.log("ADD CUSTOMER");

    fetch(`${API_HOST_URL}/api/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: customer.firstname,
        lastname: customer.lastname,
        streetaddress: customer.streetaddress,
        postcode: customer.postcode,
        city: customer.city,
        email: customer.email,
        phone: customer.phone,
      }),
    })
      .then(response => {
        if (!response.ok) {
          showNotification("Failed to save customer");
          throw new Error("Fetch failed: " + response.statusText);
        }
        showNotification("Customer saved successfully");
        fetchCustomers();
      })
      .catch((err) => console.error(err));
  };

  // Update a customer
  const updateCustomer = (customer: Customer) => {
    console.log("UPDATE CUSTOMER");

    fetch(`${API_HOST_URL}/api/customers/${customer.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: customer.firstname,
        lastname: customer.lastname,
        streetaddress: customer.streetaddress,
        postcode: customer.postcode,
        city: customer.city,
        email: customer.email,
        phone: customer.phone,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          showNotification("Failed to update customer");
          throw new Error("Fetch failed: " + response.statusText);
        }
        showNotification("Customer updated successfully");
        fetchCustomers();
      })
      .catch((err) => console.error(err));
  }

  // Delete a customer
  const deleteCustomer = (id: number) => {
    console.log("DELETE CUSTOMER");

    fetch(`${API_HOST_URL}/api/customers/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          showNotification("Failed to delete customer");
          throw new Error("Fetch failed: " + response.statusText);
        }
        showNotification("Customer deleted successfully");
        fetchCustomers();
      })
      .catch((err) => console.error(err));
  };

  const getGridApi = (): GridApi<Customer> | undefined => {
    return gridRef?.current?.api;
  }

  const notificationAction = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleCloseNotification}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  useEffect(() => {
    fetchCustomers();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <CircularLoading />;
  else {
    return (
      <>
        <div className="ag-theme-material" style={{ height: "500px", marginTop: "1rem" }}>
          <Stack spacing={2} direction="row" style={{ marginLeft: '0.5rem' }} >
            <AddCustomer addCustomer={addCustomer} />
            <CustomerCsvExport getGridApi={getGridApi} />
          </Stack>
          <AgGridReact<Customer>
            ref={gridRef}
            columnDefs={columnDefs}
            rowData={customers}
            animateRows={true}
            defaultColDef={{
              flex: 1,
              filter: true,
              sortable: true,
              resizable: true,
              floatingFilter: true,
              autoHeight: true,
              wrapText: true,
              minWidth: 200,
            }}
          ></AgGridReact>
        </div>
        <Snackbar
          open={notificationOpen}
          autoHideDuration={5000}
          onClose={handleCloseNotification}
          message={notificationMessage}
          action={notificationAction}
        />
      </>
    );
  }
}
  
export default CustomerList;