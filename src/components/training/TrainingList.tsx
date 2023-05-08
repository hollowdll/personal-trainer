import { useState, useEffect, SyntheticEvent } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { ValueGetterParams } from "ag-grid-community";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Stack, IconButton, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import CircularLoading from "../CircularLoading";
import AddTraining from "./AddTraining";
import DeleteItemDialog from "../DeleteItemDialog";
import { Training } from "../../types/training";
import { API_HOST_URL } from "../../utils/const";

function TrainingList() {
  const [trainings, setTrainings] = useState<Array<Training>>([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
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
          <DeleteItemDialog deleteItem={deleteTraining} itemId={params.getValue("id")} itemName="training" />
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

  // Fetch all trainings
  const fetchTrainings = () => {
    fetch(`${API_HOST_URL}/gettrainings`)
      .then(response => {
        if (!response.ok) {
          showNotification("Failed to fetch trainings data");
          throw new Error("Fetch failed: " + response.statusText);
        }

        return response.json();
      })
      .then(data => setTrainings(data))
      .catch(err => console.error(err));
  }

  // Add a new training to customer
  const addTraining = (training: Training, customerId: number) => {
    console.log("ADD TRAINING");

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
          showNotification("Failed to save training");
          throw new Error("Fetch failed: " + response.statusText);
        }
        showNotification("Training saved successfully");
        fetchTrainings();
      })
      .catch((err) => console.error(err));
  }

  // Delete a training
  const deleteTraining = (id: number) => {
    console.log("DELETE TRAINING");

    fetch(`${API_HOST_URL}/api/trainings/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          showNotification("Failed to delete training");
          throw new Error("Fetch failed: " + response.statusText);
        }
        showNotification("Training deleted successfully");
        fetchTrainings();
      })
      .catch((err) => console.error(err));
  };

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
    fetchTrainings();
    setTimeout(() => {
      setLoading(false);
    }, 500)
  }, []);

  if (loading) return <CircularLoading />;
  else {
    return (
      <>
        <div className="ag-theme-material" style={{ height: "500px", marginTop: "1rem" }}>
          <Stack spacing={2} direction="row" style={{ marginLeft: '0.5rem' }}>
            <AddTraining addTraining={addTraining} />
          </Stack>
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

export default TrainingList;