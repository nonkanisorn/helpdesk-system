import { Paper, Typography, Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Editrole() {
  const navigate = useNavigate();
  const { role_id, role_name } = useParams();
  const [newName, setNewpoName] = useState(role_name);

  const apiUrl = process.env.REACT_APP_API_URL;
  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("role_name", newName);

    axios
      .put(`${apiUrl}/roles/${role_id}/${newName}`, formData)
      .then((response) => {
        console.log(`Updated device name to: ${newName}`);
        navigate("/admin/Managerole");
      })
      .catch((error) => {
        console.error("Error updateing data: ", error);
      });
  };
  console.log(newName);
  console.log("noneei");
  return (
    <Box>
      <Paper>
        <Typography variant="h3" textAlign="center">
          แก้ไขตำแหน่ง
        </Typography>
        <Box ml={5} pb={3}>
          <Typography sx={{ mt: 3, mb: 3 }}>
            ชื่อตำแหน่งเดิม : {role_name}
          </Typography>
          <Box component="span">
            <Typography component="span" sx={{ mb: 3, mr: 3 }}>
              ชื่อตำแหน่งใหม่
            </Typography>
            <TextField
              onChange={(e) => setNewpoName(e.target.value)}
            ></TextField>{" "}
            <br />
          </Box>
          <Box sx={{ mt: 5, mb: 3, ml: 20 }}>
            <Button
              variant="contained"
              color="success"
              sx={{ mr: 3 }}
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
    </Box>
  );
}

export default Editrole;
