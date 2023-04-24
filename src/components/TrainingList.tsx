import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { ValueGetterParams } from "ag-grid-community";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

import { Stack } from "@mui/material";

import { Training } from "../types/training";
import AddTraining from "./AddTraining";

function TrainingList() {
  const [trainings, setTrainings] = useState<Array<Training>>([]);
  // const [message, setMessage] = useState("");

  // Format training date
  const formatDate = (params: ValueGetterParams<Training>) => {
    if (params.data) {
      return format(new Date(params.data.date), "d MMMM yyyy HH:mm", {
        locale: enUS
      });
    } else {
      return "Failed to load";
    }
  }

  // Show customer's full name
  const showCustomerFullName = (params: ValueGetterParams<Training>) => {
    if (params.data) {
      const customer = params.data.customer;
      return customer ? `${customer.firstname} ${customer.lastname}` : "No customer found";
    } else {
      return "Failed to load";
    }
  }
  
  const columnDefs = [
    { headerName: "ID", field: "id" },
    {
      headerName: "Date",
      field: "date",
      valueGetter: formatDate,
    },
    { headerName: "Duration in minutes", field: "duration" },
    { headerName: "Activity", field: "activity" },
    {
      headerName: "Customer",
      field: "customer",
      valueGetter: showCustomerFullName,
    }
  ];

  useEffect(() => {
    fetchTrainings();
  }, []);

  // Fetch all trainings
  const fetchTrainings = () => {
    fetch("https://traineeapp.azurewebsites.net/gettrainings")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch trainings data");
        }

        return response.json();
      })
      .then(data => setTrainings(data))
      .catch(err => console.error(err));
  }

  return (
    <div>
      <h1>Trainings</h1>
      <Stack spacing={2} direction="row">
        <AddTraining />
      </Stack>
      <div className="ag-theme-material" style={{ height: "500px" }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={trainings}
          animateRows={true}
          defaultColDef={{
            flex: 1,
            filter: true,
            sortable: true,
            resizable: true,
            floatingFilter: true
          }}
        ></AgGridReact>
      </div>
    </div>
  );
}

export default TrainingList;