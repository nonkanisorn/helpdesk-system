import { Button, Box, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Editstatus() {
  const navigate = useNavigate();
  const { status_id, status_name } = useParams();
  const [newName, setNewDevName] = useState(status_name);

  const apiUrl = process.env.REACT_APP_API_URL;
  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("newName", newName);

    axios
      .put(`${apiUrl}/Status/${status_id}/${newName}`, formData)
      .then(() => {
        console.log(`Updated device name to: ${newName}`);
        navigate("/admin/Managestatus");
      })
      .catch((error) => {
        console.error("Error updateing data: ", error);
      });
  };
  console.log(newName);
  return (
    <Paper sx={{ pb: 5 }}>
      <Typography variant="h3" textAlign="center">
        แก้ไ้ขสถานะ
      </Typography>
      <Box ml={5}>
        <Typography sx={{ mb: 3 }}>ชื่อสถานะเดิม : {status_name}</Typography>
        <Typography component="span">ชื่อสถานะใหม่ : </Typography>
        <TextField onChange={(e) => setNewDevName(e.target.value)}></TextField>
        <br />
        <Box mt={3} ml={15}>
          <Button
            variant="contained"
            sx={{ mr: 5 }}
            color="success"
            onClick={handleUpdate}
          >
            ยืนยัน
          </Button>
          <Button variant="contained" color="error">
            ยกเลิก
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default Editstatus;
