import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Customer } from "../types/customer";
import { Stack } from "@mui/material";

import AddCustomer from "./AddCustomer";

function CustomerList() {
  const [customers, setCustomers] = useState<Array<Customer>>([]);
  const [message, setMessage] = useState("");

  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "First name", field: "firstname" },
    { headerName: "Last name", field: "lastname" },
    { headerName: "Street address", field: "streetaddress" },
    { field: "postcode" },
    { field: "city" },
    { field: "email" },
    { field: "phone" }
  ];

  // Fetch all customers when rendered
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch("https://traineeapp.azurewebsites.net/getcustomers")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch customers data");
        }

        return response.json();
      })
      .then(data => setCustomers(data))
      .catch(err => console.error(err));
  }

  const addCustomer = (customer: Customer) => {
    console.log("add customer");
    console.log(customer);

    fetch("https://traineeapp.azurewebsites.net/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
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

  return (
    <div>
      <h1>Customers</h1>
      <p>{message}</p>
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