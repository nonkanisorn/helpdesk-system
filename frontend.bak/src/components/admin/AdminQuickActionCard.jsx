import {
  Typography,
  Paper,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  Stack,
} from "@mui/material";
const AdminQuickActionCard = ({
  icon = "icon",
  title = "title",
  subtitle = "subtitle",
}) => {
  return (
    <>
      <Paper sx={{ minHeight: 160, p: 4 }}>
        <Stack spacing={2}>
          <Typography>{icon}</Typography>
          <Typography fontWeight="fontWeightBold">{title}</Typography>
          <Typography color="grey">{subtitle}</Typography>
          <Button variant="contained" sx={{ width: "100%", mt: 2 }}>
            เพิ่ม
          </Button>
        </Stack>
      </Paper>
    </>
  );
};

export default AdminQuickActionCard;
