import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Customer } from "../types/customer";
import { IconButton, Stack } from "@mui/material";
import { ValueGetterParams } from "ag-grid-community";
import DeleteIcon from "@mui/icons-material/Delete";

import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

import { API_HOST_URL } from "../utils/const";

function CustomerList() {
  const [customers, setCustomers] = useState<Array<Customer>>([]);
  const [message, setMessage] = useState("");

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
      width: 50,
      filter: false,
      sortable: false,
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
      width: 50,
      field: "id",
      filter: false,
      sortable: false,
      cellStyle: { border: "none" },
      cellRenderer: (params: ValueGetterParams<Customer>) => {
        return (
          <IconButton onClick={() => deleteCustomer(params.getValue("id"))} color="error">
            <DeleteIcon />
          </IconButton>
        )
      }
    }
  ];

  // Fetch all customers
  const fetchCustomers = () => {
    fetch(`${API_HOST_URL}/getcustomers`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch customers data");
        }

        return response.json();
      })
      .then(data => setCustomers(data))
      .catch(err => console.error(err));
  }

  // Add a new customer
  const addCustomer = (customer: Customer) => {
    console.log("ADD CUSTOMER");
    console.log(customer);

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
          setMessage("Failed to add customer");
          throw new Error("Fetch failed: " + response.statusText);
        }

        setMessage("Customer added successfully");
        fetchCustomers();
      })
      .catch((err) => console.error(err));
  };

  // Update a customer
  const updateCustomer = (customer: Customer) => {
    console.log("UPDATE CUSTOMER");
    console.log(customer);

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
          setMessage("Failed to update customer");
          throw new Error("Fetch failed: " + response.statusText);
        }

        setMessage("Customer updated successfully");
        fetchCustomers();
      })
      .catch((err) => console.error(err));
  }

  // Delete a customer
  const deleteCustomer = (id: number) => {
    console.log("DELETE CUSTOMER")
    console.log(id);

    if (window.confirm("Are you sure you want to delete this customer?")) {
      fetch(`${API_HOST_URL}/api/customers/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            setMessage("Failed to delete customer");
            throw new Error("Fetch failed: " + response.statusText);
          }

          setMessage("Customer deleted successfully");
          fetchCustomers();
        })
        .catch((err) => console.error(err));
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <h1>Customers</h1>
      <h3>{message}</h3>
      <Stack spacing={2} direction="row">
        <AddCustomer addCustomer={addCustomer} />
      </Stack>
      <div className="ag-theme-material" style={{ height: "500px" }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={customers}
          animateRows={true}
          defaultColDef={{
            flex: 1,
            filter: true,
            sortable: true,
            resizable: true,
            floatingFilter: true,
          }}
        ></AgGridReact>
      </div>
    </div>
  );
}
  
export default CustomerList;