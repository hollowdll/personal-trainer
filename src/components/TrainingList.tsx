import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { ValueGetterParams } from "ag-grid-community";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Training } from "../types/training";

function TrainingList() {
  const [trainings, setTrainings] = useState<Array<Training>>([]);

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
      return params.data.customer.firstname + " " + params.data.customer.lastname;
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

  // Fetch all trainings when rendered
  useEffect(() => {
    fetch("https://traineeapp.azurewebsites.net/gettrainings")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch trainings data");
        }

        return response.json();
      })
      .then(data => setTrainings(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Trainings</h1>
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