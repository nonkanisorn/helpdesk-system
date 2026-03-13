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

const AddDeviceTypeDialog = ({ open, onClose, onSuccess }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [deviceTypeName, setDeviceTypename] = useState("");
  const createDeviceType = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/device/type`,
        { devicetype_name: deviceTypeName },
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
        <DialogTitle>เพิ่มประเภทอุปกรณ์</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ pt: 1.5, mb: 2 }}>
            ใช้สำหรับกำหนดประเภทของอุปกรณ์ในระบบ
          </DialogContentText>
          <form onSubmit={createDeviceType} id="create-device-type-form">
            <TextField
              label="ประเภทอุปกรณ์"
              fullWidth
              onChange={(e) => setDeviceTypename(e.target.value)}
            ></TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>ยกเลิก</Button>
          <Button
            form="create-device-type-form"
            type="submit"
            onClick={onClose}
          >
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddDeviceTypeDialog;
