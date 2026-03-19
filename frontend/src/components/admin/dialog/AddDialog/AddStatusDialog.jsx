import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const AddStatusDialog = ({ open, onClose, onSuccess }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [statusName, setStatusname] = useState("");
  const createrole = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/status`,
        { status_name: statusName },
        {
          headers: {
            "Content-Type": "application/json", // ระบุ Content-Type ไปยัง server
          },
        },
      );
      onClose?.();
      onSuccess?.();

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        // sx={{ p: 1 }}
      >
        <DialogTitle>เพิ่มสถานะ</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ pt: 1.5, mb: 2 }}>
            ใช้สำหรับกำหนดสถานะของรายการแจ้งซ่อมในแต่ละขั้นตอน
          </DialogContentText>
          <form onSubmit={createrole} id="create-status-form">
            <TextField
              label="สถานะ"
              fullWidth
              onChange={(e) => setStatusname(e.target.value)}
            ></TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>ยกเลิก</Button>
          <Button form="create-status-form" type="submit" onClick={onClose}>
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddStatusDialog;
