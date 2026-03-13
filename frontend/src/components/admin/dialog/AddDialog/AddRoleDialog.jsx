import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import {
  Paper,
  Box,
  Typography,
  Grid,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Input,
  TextField,
  Select,
  MenuItem,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const AddRoleDialog = ({ open, onClose, onSuccess }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [createRoles, setCreateRoles] = useState("");
  const createrole = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/roles`,
        { role_name: createRoles },
        {
          headers: {
            "Content-Type": "application/json", // ระบุ Content-Type ไปยัง server
          },
        },
      );
      // setrolename("");
      // navigate("/admin/Managerole");
      onClose?.();
      onSuccess?.();

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("das", createRoles);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        // sx={{ p: 1 }}
      >
        <DialogTitle>เพิ่มบทบาท</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ pt: 1.5, mb: 2 }}>
            ใช้สำหรับกำหนดสิทธิ์และหน้าที่ของผู้ใช้งานในระบบ
          </DialogContentText>
          <form onSubmit={createrole} id="create-roles-form">
            <TextField
              label="บทบาท"
              fullWidth
              onChange={(e) => setCreateRoles(e.target.value)}
            ></TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>ยกเลิก</Button>
          <Button form="create-roles-form" type="submit" onClick={onClose}>
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddRoleDialog;
