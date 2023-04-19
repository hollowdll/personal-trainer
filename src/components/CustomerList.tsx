import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Customer } from "../types/customer";

function CustomerList() {
  const [customers, setCustomers] = useState<Array<Customer>>([]);

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
    fetch("https://traineeapp.azurewebsites.net/getcustomers")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch customers data");
        }

        return response.json();
      })
      .then(data => setCustomers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Customers</h1>
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