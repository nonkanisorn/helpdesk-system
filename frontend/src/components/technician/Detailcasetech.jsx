import axios from "axios";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { Checkbox, FormControlLabel } from "@mui/material";
import {
  Paper,
  Box,
  Button,
  Stack,
  TextField,
  TextareaAutosize,
} from "@mui/material";

function Detailcasetech() {
  const { ticket_id } = useParams();
  const navigate = useNavigate();
  const user_id = useSelector((state) => state.user.user_id);

  const [ticketDatabyId, setticketDatabyId] = useState({});
  const [noSerial, setNoSerial] = useState(false);

  const status_id = 4;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      serial_number: "",
      ticket_resolution: "",
    },
  });

  // ติ๊กแล้วล้างค่า serial กันค้าง
  useEffect(() => {
    if (noSerial) {
      setValue("serial_number", "");
    }
  }, [noSerial, setValue]);

  const workComplete = async (data) => {
    // ✅ ถ้าไม่ติ๊ก และไม่ได้กรอก serial → alert และหยุด
    if (
      !noSerial &&
      (!data.serial_number || data.serial_number.trim() === "")
    ) {
      alert("กรุณาระบุรหัสอุปกรณ์ หรือเลือก 'ไม่ระบุรหัสอุปกรณ์'");
      return;
    }

    try {
      await axios.patch(
        `http://localhost:5011/ticket/${user_id}/${ticket_id}`,
        {
          status_id,
          serial_number: noSerial ? null : data.serial_number.trim(),
          ticket_resolution: data.ticket_resolution,
        },
      );

      navigate(-2);
    } catch (error) {
      console.log("error", error.response?.data || error);
      alert("กรุณาใส่รหัสอุปกรณ์ให้ถูกต้อง");
    }
  };

  const handleCancel = () => {
    navigate(-2);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5011/ticket/${ticket_id}`,
        );
        if (response.data && response.data.length > 0) {
          setticketDatabyId(response.data[0]);
          console.log("Response data:", response.data[0]);
        } else {
          console.error("No data found for this ticket ID");
        }
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    };

    fetchData();
  }, [ticket_id]);

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
            </Typography>
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
              label="กรอกเฉพาะกรณีอุปกรณ์ Hardware"
              disabled={noSerial}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
              {...register("serial_number")}
            />

            <FormControlLabel
              sx={{ mt: 1 }}
              control={
                <Checkbox
                  checked={noSerial}
                  onChange={(e) => setNoSerial(e.target.checked)}
                />
              }
              label="ไม่ระบุรหัสอุปกรณ์"
            />

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
              {...register("ticket_resolution", {
                required: "กรุณาระบุผลการซ่อม",
              })}
            />

            {errors.ticket_resolution && (
              <Typography color="error" sx={{ mt: 1 }}>
                {errors.ticket_resolution.message}
              </Typography>
            )}
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
              type="button"
              onClick={handleCancel}
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
