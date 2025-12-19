import { Paper, Box, Typography, Grid, Stack, Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Paperui from "../ui/Paperui";
import PaperuiV2 from "../ui/PaperuiV2";
import { amber, green, red } from "@mui/material/colors";
import SignalCellularAltRoundedIcon from "@mui/icons-material/SignalCellularAltRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { Link } from "react-router-dom";
function Managerpages() {
  const [casedata, setcasedata] = useState([]);
  console.log(casedata);
  const casedatalenght = () => {
    return casedata.length;
  };
  const datafilterstatuscase4 = () => {
    return casedata.filter((data) => data.status_id === 4).length;
  };

  const datafilterstatuscase3 = () => {
    return casedata.filter((data) => data.status_id === 3).length;
  };
  const datafilterstatuscase2 = () => {
    return casedata.filter((data) => data.status_id === 2).length;
  };
  const datafilterstatuscase1 = () => {
    return casedata.filter((data) => data.status_id === 1).length;
  };

  useEffect(() => {
    axios.get(`http://localhost:5011/caseall`).then((response) => {
      setcasedata(response.data);
    });
  }, []);
  console.log("casedata4", datafilterstatuscase4());
  console.log("casedata3", datafilterstatuscase3());
  console.log("casedata2", datafilterstatuscase2());
  console.log("casedata1", datafilterstatuscase1());
  console.log("allcase", casedatalenght());
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" fontWeight="fontWeightBold">
          Dashbaord ผู้จัดการ
        </Typography>
        <Link to={{ pathname: "/manager/reportcase" }}>
          <Button variant="contained" sx={{ borderRadius: 3 }}>
            <SignalCellularAltRoundedIcon sx={{ mr: 1, fontSize: 20 }} />{" "}
            ดูรายงานเต็ม
          </Button>
        </Link>
      </Stack>
      <Typography sx={{ marginY: 2 }} color="grey">
        ภาพรวมรายงานการซ่อมทั้งหมด
      </Typography>
      <Grid container spacing={4}>
        <Grid item md={3}>
          <PaperuiV2
            title="งานทั้งหมด"
            icon={
              <ConstructionRoundedIcon
                sx={{ fontSize: 50, color: "#2463EB" }}
              />
            }
          />
        </Grid>
        <Grid item md={3}>
          <PaperuiV2
            title="เสร็จสิ้น"
            icon={
              <CheckCircleOutlineRoundedIcon
                sx={{ fontSize: 50, color: green[500] }}
              />
            }
          />
        </Grid>
        <Grid item md={3}>
          <PaperuiV2
            title="กําลังดําเนินการ"
            icon={
              <AccessTimeRoundedIcon sx={{ fontSize: 50, color: amber[400] }} />
            }
          />
        </Grid>
        <Grid item md={3}>
          <PaperuiV2
            title="เกินกำหนด"
            icon={
              <ErrorOutlineRoundedIcon sx={{ fontSize: 50, color: red[400] }} />
            }
          />
        </Grid>
      </Grid>
      <Paper sx={{ borderRadius: 3, p: 5, mt: 5 }}>
        <Typography variant="h5" fontWeight="fontWeightBold">
          สรุปผลงานช่างแต่ละคน
        </Typography>
        <Typography color="grey">
          จำนวนงงานที่ได้รับมอบหมายและงานที่เสร็จสิ้น
        </Typography>
        <Grid container>
          <Grid item xs={12} md={12}>
            <Paper sx={{ minHeight: 150, borderRadius: 3, mt: 3, p: 4 }}>
              <Typography>ชื่อนายคณิศร</Typography>
              <Stack direction="row" justifyContent="space-between">
                <Typography color="grey">ได้รับมอบหมาย</Typography>
                <Typography color="grey">เสร็จสิ้น</Typography>
                <Typography color="grey"> เกินกำหนด</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography color="black">0</Typography>
                <Typography color="green">0</Typography>
                <Typography textAlign="center" color="orange">
                  0
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
export default Managerpages;
