// Export customers to CSV file and download it

import { Button } from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import { Customer } from "../types/customer";

type Props = {
  customers: Array<Customer>,
}

function CustomerExport({ customers }: Props) {
  const exportCustomersToCsvFile = () => {
    console.log("EXPORT TO CSV");
    console.log(customers);
  }

  const downloadFile = () => {
    console.log("DOWNLOADED");
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