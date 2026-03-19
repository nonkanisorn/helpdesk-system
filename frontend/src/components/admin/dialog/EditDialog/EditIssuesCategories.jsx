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

const EditIssuesCategoriesDialog = ({ id, open, onClose, onSuccess }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [issuesCategoriesName, setIssuesCategoriesName] = useState("");
  const createIssuesCateries = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${apiUrl}/issues-categories/${id}`,
        { issues_categories_name: issuesCategoriesName },
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
  console.log("id", id);
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        // sx={{ p: 1 }}
      >
        <DialogTitle>แก้ไขประเภทปัญหา</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ pt: 1.5, mb: 2 }}>
            ใช้สำหรับกำหนดประเภทของปัญหาในระบบ
          </DialogContentText>
          <form
            onSubmit={createIssuesCateries}
            id="create-issues-categories-form"
          >
            <TextField
              label="ประเภทปัญหา"
              fullWidth
              onChange={(e) => setIssuesCategoriesName(e.target.value)}
            ></TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>ยกเลิก</Button>
          <Button
            form="create-issues-categories-form"
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

export default EditIssuesCategoriesDialog;
