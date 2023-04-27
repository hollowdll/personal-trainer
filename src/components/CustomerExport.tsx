// Export customers to CSV file and download it

import { Button } from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { GridApi } from "ag-grid-community";

import { Customer } from "../types/customer";

type Props = {
  gridApi: GridApi<Customer> | undefined,
}

function CustomerExport({ gridApi }: Props) {
  const getParams = () => {
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
      ]
    };
  }

  const exportCustomersToCsvFile = () => {
    console.log("EXPORT TO CSV");
    gridApi?.exportDataAsCsv(getParams());
  }

  return (
    <Button
      onClick={exportCustomersToCsvFile}
      variant="outlined"
      startIcon={<FileDownloadIcon />}
    >
      Export to CSV file
    </Button>
  );
}

export default CustomerExport;