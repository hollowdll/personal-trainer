import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Training } from "../types/training";

function TrainingList() {
  const [trainings, setTrainings] = useState<Array<Training>>([]);

  const columnDefs = [
    { headerName: "ID", field: "id" },
    { field: "date" },
    { headerName: "Duration in minutes", field: "duration" },
    { field: "activity" },
    { headerName: "Customer", field: "customer.firstname" }

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