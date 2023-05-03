import { Box, CircularProgress } from "@mui/material";

export default function CircularLoading() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        msTransform: 'translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)',
        margin: 0,
        padding: 0,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
