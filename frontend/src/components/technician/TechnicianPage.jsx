import {
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  Stack,
  Chip,
} from "@mui/material";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { amber, green, red, blue, grey } from "@mui/material/colors";

import axios from "axios";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Paperui from "../ui/Paperui";
import PaperuiV2 from "../ui/PaperuiV2";
import { Link } from "react-router-dom";

function Technicianpage() {
  const [ticketdata, setticketdata] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const technician_id = useSelector((state) => state.user.user_id);
  const ticketdatalenght = () => {
    return ticketdata.length;
  };
  const datafilterstatusticket5 = () => {
    return ticketdata.filter((data) => data.status_id === 5).length;
  };
  const datafilterstatusticket6 = () => {
    return ticketdata.filter((data) => data.status_id === 6).length;
  };
  const datafilterstatusticket4 = () => {
    return ticketdata.filter((data) => data.status_id === 4).length;
  };

  const datafilterstatusticket3 = () => {
    return ticketdata.filter((data) => data.status_id === 3).length;
  };
  const datafilterstatusticket2 = () => {
    return ticketdata.filter((data) => data.status_id === 2).length;
  };
  const coutIsOverDue = () => {
    return ticketdata.filter((data) => data.is_overdue === 1).length;
  };
  console.log("st2", datafilterstatusticket2());
  useEffect(() => {
    axios.get(`${apiUrl}/ticket/user/${technician_id}`).then((response) => {
      setticketdata(response.data);
    });
  }, []);
  console.log(ticketdata);
  return (
    <Box sx={{ pr: 2, height: "100vh", overflowY: "scroll" }}>
      <Typography variant="h4" fontWeight="fontWeightBold">
        Dashboard ช่าง
      </Typography>
      <Typography color="grey" sx={{ mb: 4, mt: 1 }}>
        จัดการงานและติดตามงานที่ได้รับมอบหมาย{" "}
      </Typography>
      <Grid container spacing={4}>
        <Grid item md={3}>
          <PaperuiV2
            title="งานที่ได้รับมอบหมาย"
            icon={
              <ConstructionRoundedIcon
                sx={{ fontSize: 50, color: "#2463EB" }}
              />
            }
            number={ticketdatalenght()}
          />
        </Grid>
        <Grid item md={3}>
          <PaperuiV2
            title="รอการยืนยันจากผู้ใช้"
            number={datafilterstatusticket5()}
            icon={
              <PendingActionsRoundedIcon
                sx={{ fontSize: 50, color: amber[400] }}
              />
            }
          />
        </Grid>
        <Grid item md={3}>
          <PaperuiV2
            title="เสร็จสิ้น"
            number={datafilterstatusticket6()}
            icon={
              <CheckCircleOutlineRoundedIcon
                sx={{ fontSize: 50, color: green[500] }}
              />
            }
          />
        </Grid>
        <Grid item md={3}>
          <PaperuiV2
            title="เกินกำหนด"
            number={coutIsOverDue()}
            icon={
              <ErrorOutlineRoundedIcon sx={{ fontSize: 50, color: red[400] }} />
            }
          />
        </Grid>
      </Grid>
      <Typography
        variant="h4"
        fontWeight="fontWeightBold"
        sx={{ mt: 4, mb: 3 }}
      >
        งานที่ได้รับมอบหมาย
      </Typography>
      <Grid container rowSpacing={2} sx={{ pb: 15 }}>
        {ticketdata.map((items, index) => (
          <Grid item md={12}>
            <Paper sx={{ minHeight: 220, borderRadius: 3, p: 5 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  sx={{ mb: 1 }}
                  fontWeight="fontWeightBold"
                  variant="h6"
                >
                  {items.title}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography color="grey" variant="body2">
                  รายละเอียด:{items.description}
                </Typography>
                <Typography color="grey" variant="body2">
                  วันที่ได้รับมอบหมาย:{" "}
                  {new Date(items.created_at).toLocaleString("th-TH", {
                    dateStyle: "long",
                    timeStyle: "medium",
                  })}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <Link
                  to={{ pathname: `/technician/repairs/${items.ticket_id}` }}
                >
                  <Button
                    variant="contained"
                    sx={{ borderRadius: 3, bgcolor: blue.A700 }}
                  >
                    ดูรายละเอียด
                  </Button>
                </Link>
                {/* <Button */}
                {/*   variant="contained" */}
                {/*   sx={{ borderRadius: 3, bgcolor: grey[50], color: "black" }} */}
                {/* > */}
                {/*   ดูรายละเอียด */}
                {/* </Button> */}
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
export default Technicianpage;
