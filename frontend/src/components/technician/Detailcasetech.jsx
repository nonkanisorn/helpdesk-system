import axios from "axios";
import { useForm } from "react-hook-form";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import {
  Paper,
  Box,
  Button,
  Stack,
  TextField,
  TextareaAutosize,
} from "@mui/material";

function Detailcasetech() {
  const { case_id } = useParams();
  const navigate = useNavigate();
  const [caseDatabyId, setCaseDatabyId] = useState({});
  const user_id = useSelector((state) => state.user.users_id);
  const status_id = 3;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const workComplete = (data) => {
    console.log("data", data);
    axios
      .patch(`http://localhost:5011/case/${user_id}/${case_id}`, {
        status_id,
        serial_number: data.serial_number,
        case_resolution: data.case_resolution,
      })
      .then(() => navigate(-2))
      .catch((error) => {
        if (error) {
          console.log("error", error.response.data);
          alert("กรุณาใส่รหัสอุปกรณ์ให้ถูกต้อง");
        }
      });
  };
  const handleCancel = () => {
    navigate(-2);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5011/case/${case_id}`,
        );
        if (response.data && response.data.length > 0) {
          setCaseDatabyId(response.data[0]);
          console.log("Response data:", response.data[0]);
        } else {
          console.error("No data found for this case ID");
        }
      } catch (error) {
        console.error("Error fetching case data:", error);
      }
    };

    fetchData();
  }, [case_id]);
  return (
    <Box sx={{ marginX: "25%" }}>
      <Typography variant="h4" fontWeight="fontWeightBold">
        บันทึกการซ่อม
      </Typography>
      <Typography color="grey">กรอกข้อมูลผลการซ่อมอุปกรณ์</Typography>
      <Paper sx={{ p: 5, mt: 4 }}>
        <Stack direction="row">
          <AssignmentIcon
            sx={{
              fontSize: 50,
              bgcolor: blue[500],
              color: "white",
              alignSelf: "center",
              borderRadius: 2,
            }}
          />
          <Stack sx={{ ml: 2 }}>
            <Typography variant="h5" fontWeight="fontWeightBold">
              ฟอร์มบันทึกการซ่อม
            </Typography>{" "}
            <Typography color="grey">กรุณากรอกข้อมูลให้ครบถ้วน</Typography>
          </Stack>
        </Stack>
        <form onSubmit={handleSubmit(workComplete)}>
          <Stack sx={{ mt: 4 }}>
            <Typography sx={{ mb: 2 }} fontWeight="fontWeightBold">
              รหัสอุปกรณ์
            </Typography>
            <TextField
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
              {...register("serial_number")}
            ></TextField>
            <Typography sx={{ mt: 3, mb: 2 }} fontWeight="fontWeightBold">
              ผลการซ่อม
            </Typography>
            <TextareaAutosize
              minRows={10}
              style={{
                borderRadius: "12px",
                padding: "10px",
                resize: "vertical",
                border: "1px solid #ccc",
              }}
              {...register("case_resolution")}
            ></TextareaAutosize>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={1}
            sx={{ mt: 4 }}
          >
            <Button
              variant="contained"
              sx={{ borderRadius: 3, minWidth: "50%" }}
              type="submit"
            >
              ยืนยัน
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: 3,
                minWidth: "50%",
                bgcolor: "#f5f5f5",
                color: "black",
              }}
              type="reset"
              onClick={() => handleCancel()}
            >
              ยกเลิก
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default Detailcasetech;
