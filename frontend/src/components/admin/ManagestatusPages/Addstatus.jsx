import * as React from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

import InputLabel from "@mui/material/InputLabel";
import { Button, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Addstatus() {
  const navigate = useNavigate()
  const [statusName, setStatusname] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;
  // console.log(positionName);
  const formData = new FormData();
  formData.append("status_name", statusName);

  const createstatus = async (e, event) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/Status`,
        formData,
        {
          headers: {
            "Content-Type": "application/json", // ระบุ Content-Type ไปยัง server
          },
        }
      );
      setStatusname("");
      navigate("/admin/Managestatus")
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
        border: 1,
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <h1>เพิ่มตำแหน่ง</h1>
      </div>
      <FormControl variant="standard">
        <div style={{ marginLeft: 15, marginBottom: 15 }}></div>
        <div style={{ marginLeft: 15, marginBottom: 15 }}>
          ตำแหน่ง :
          <TextField
            id="status_name"
            type="text"
            value={statusName}
            onChange={(e) => setStatusname(e.target.value)}
            placeholder="ใส่อุปกรณ์"
            sx={{ marginLeft: 2 }}
          />
        </div>
        <Button onClick={createstatus}>เพิ่มสถานะ</Button>
      </FormControl>
    </Box>
  );
}

export default Addstatus;
