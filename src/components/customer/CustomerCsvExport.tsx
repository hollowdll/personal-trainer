// Export customers to CSV file and download it

import { useState, ChangeEvent } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Dialog,
  Button,
  DialogContentText,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { CsvExportParams, GridApi } from "ag-grid-community";
import { Customer } from "../../types/customer";

type Props = {
  getGridApi: () => GridApi<Customer> | undefined,
}

function CustomerCsvExport({ getGridApi }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fileName, setFileName] = useState("");

  const getParams = (): CsvExportParams => {
    return {
      columnKeys: [
        "id",
        "firstname",
        "lastname",
        "streetaddress",
        "postcode",
        "city",
        "email",
        "phone"
      ],
      fileName: fileName,
    };
  }

  const exportCustomersToCsvFile = () => {
    console.log("EXPORT TO CSV");
    getGridApi()?.exportDataAsCsv(getParams());
  }

  const handleClose = () => {
    setDialogOpen(false);
  }

  const handleDownload = () => {
    exportCustomersToCsvFile();
    handleClose();
  }

  const inputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  }

  const handleClickOpen = () => {
    setDialogOpen(true);
  }

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        startIcon={<FileDownloadIcon />}
      >
        Export to CSV
      </Button>
      <Dialog onClose={handleClose} open={dialogOpen}>
        <DialogTitle>Export customer data to CSV file</DialogTitle>
        <DialogContent>
          <TextField
            name="filename"
            value={fileName}
            label="File Name"
            margin="dense"
            onChange={inputChanged}
            fullWidth={true}
          />
          <DialogContentText>
            {`${getGridApi() ? "" : "Data cannot be downloaded due to an unexpected error"}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDownload}>Download</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CustomerCsvExport;