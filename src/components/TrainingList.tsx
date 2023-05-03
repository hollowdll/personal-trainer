import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { ValueGetterParams } from "ag-grid-community";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Stack } from "@mui/material";

import CircularLoading from "./CircularLoading";
import AddTraining from "./AddTraining";
import DeleteItemDialog from "./DeleteItemDialog";
import { Training } from "../types/training";
import { API_HOST_URL } from "../utils/const";

function TrainingList() {
  const [trainings, setTrainings] = useState<Array<Training>>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  
  const columnDefs = [
    { headerName: "ID", field: "id" },
    {
      headerName: "Date",
      // format date
      valueGetter: (params: ValueGetterParams<Training>) => {
        const date = params?.data?.date;
        return date ? format(new Date(date), "d MMMM yyyy HH:mm", {
          locale: enUS
        }) : "No date found";
      }
    },
    { headerName: "Duration in minutes", field: "duration" },
    { headerName: "Activity", field: "activity" },
    {
      headerName: "Customer",
      valueGetter: (params: ValueGetterParams<Training>) => {
        const customer = params?.data?.customer;
        return customer ? `${customer.firstname} ${customer.lastname}` : "No customer found";
      }
    },
    {
      headerName: "Customer ID",
      valueGetter: (params: ValueGetterParams<Training>) => {
        const customer = params?.data?.customer;
        return customer ? customer.id : "No customer found";
      }
    },
    // Delete button column
    {
      headerName: "",
      maxWidth: 150,
      field: "id",
      filter: false,
      sortable: false,
      cellStyle: { border: "none" },
      cellRenderer: (params: ValueGetterParams<Training>) => {
        return (
          <DeleteItemDialog deleteItem={deleteTraining} itemId={params.getValue("id")} />
        )
      }
    }
  ];

  // Fetch all trainings
  const fetchTrainings = () => {
    fetch(`${API_HOST_URL}/gettrainings`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch trainings data");
        }

        return response.json();
      })
      .then(data => setTrainings(data))
      .catch(err => console.error(err));
  }

  // Add a new training to customer
  const addTraining = (training: Training, customerId: number) => {
    console.log("ADD TRAINING");
    console.log(training);

    fetch(`${API_HOST_URL}/api/trainings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: training.date,
        duration: training.duration,
        activity: training.activity,
        customer: `${API_HOST_URL}/api/customers/${customerId}`,
      }),
    })
      .then(response => {
        if (!response.ok) {
          setMessage("Failed to add training");
          throw new Error("Fetch failed: " + response.statusText);
        }

        setMessage("Training added successfully");
        fetchTrainings();
      })
      .catch((err) => console.error(err));
  }

  // Delete a training
  const deleteTraining = (id: number) => {
    console.log("DELETE TRAINING");
    console.log(id);

    fetch(`${API_HOST_URL}/api/trainings/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          setMessage("Failed to delete training");
          throw new Error("Fetch failed: " + response.statusText);
        }

        setMessage("Training deleted successfully");
        fetchTrainings();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTrainings();
    setTimeout(() => {
      setLoading(false);
    }, 500)
  }, []);

  if (loading) return <CircularLoading />;
  else {
    return (
      <>
        <h2 className="message">{message}</h2>
        <Stack spacing={2} direction="row">
          <AddTraining addTraining={addTraining} />
        </Stack>
        <div className="ag-theme-material" style={{ width: '100%', height: "500px" }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={trainings}
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
      </>
    );
  }
}

export default TrainingList;