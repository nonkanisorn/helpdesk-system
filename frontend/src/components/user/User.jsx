import { Box, Stack, Typography, Grid, Paper, Button } from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import PageviewRoundedIcon from "@mui/icons-material/PageviewRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HandymanIcon from "@mui/icons-material/Handyman";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Paperui from "../ui/Paperui";
import { Link } from "react-router-dom";
import { amber, indigo } from "@mui/material/colors";

function User() {
  const [casedata, setcasedata] = useState([]);
  console.log(casedata);
  const user_id = useSelector((state) => state.user.users_id);
  console.log(casedata);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5011/case/lasted/${user_id}`,
        );
        setcasedata(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);
  return (
    <Box sx={{ ml: "10%", mr: "10%" }}>
      <Box>
        <Typography variant="h4" align="center" sx={{ mt: 10 }}>
          ยินดีต้อนรับสู่ระบบแจ้งซ่อม
        </Typography>
        <Typography color="grey" align="center">
          เราพร้อมให้บริการและดูแลปัญหาของคุณอย่างรวดเร็วและมีประสิทธิภาพ
        </Typography>
      </Box>
      <Box>
        <Typography fontWeight="fontWeightBold" sx={{ mt: 12 }} variant="h5">
          เริ่มต้นใช้งาน
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item md={6}>
            <Paper square sx={{ height: 250, p: 2, borderRadius: 3 }}>
              <AddBoxRoundedIcon sx={{ color: "#2A66EA", fontSize: "4vw" }} />
              <Typography variant="h6" fontWeight="fontWeightBold" mt={2}>
                แจ้งซ่อม
              </Typography>
              <Typography color="grey">แจ้งปัญหาและขอรับบริการซ่อม</Typography>
              <Link to={{ pathname: "/user/repair-request" }}>
                <Button
                  variant="contained"
                  sx={{
                    mt: 3,
                    width: "100%",
                    borderRadius: 3,
                    color: "black",
                    bgcolor: "#F8F8F7",
                  }}
                >
                  เลือก
                </Button>
              </Link>
            </Paper>
          </Grid>
          {/* <Grid item md={4}> */}
          {/*   <Paper square sx={{ height: 250, p: 2, borderRadius: 3 }}> */}
          {/*     <SearchRoundedIcon sx={{ color: "orange", fontSize: "4vw" }} /> */}
          {/*     <Typography variant="h6" fontWeight="fontWeightBold" mt={2}> */}
          {/*       ติดตามสถานะ */}
          {/*     </Typography> */}
          {/*     <Typography color="grey">แจ้งปัญหาและขอรับบริการซ่อม</Typography> */}
          {/*     <Button */}
          {/*       variant="contained" */}
          {/*       sx={{ */}
          {/*         mt: 3, */}
          {/*         width: "100%", */}
          {/*         borderRadius: 3, */}
          {/*         color: "black", */}
          {/*         bgcolor: "#F8F8F7", */}
          {/*       }} */}
          {/*     > */}
          {/*       เลือก */}
          {/*     </Button> */}
          {/*   </Paper> */}
          {/* </Grid> */}
          <Grid item md={6}>
            <Paper square sx={{ height: 250, p: 2, borderRadius: 3 }}>
              <HistoryRoundedIcon sx={{ color: "green", fontSize: "4vw" }} />
              <Typography variant="h6" fontWeight="fontWeightBold" mt={2}>
                ติดตามสถานะ/ประวัติการซ่อมของฉัน
              </Typography>
              <Typography color="grey">ดูรายการซ่อมทั้งหมดของคุณ</Typography>
              <Link to={{ pathname: "/user/repair-history" }}>
                <Button
                  variant="contained"
                  sx={{
                    mt: 3,
                    width: "100%",
                    borderRadius: 3,
                    color: "black",
                    bgcolor: "#F8F8F7",
                  }}
                >
                  เลือก
                </Button>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography fontWeight="fontWeightBold" sx={{ mt: 5 }} variant="h5">
          รายการล่าสุด
        </Typography>
        <Link to={{ pathname: "/user/repair-history" }}>
          <Button>
            {" "}
            <Typography sx={{ mt: 6, mb: 2 }} variant="subtitle1">
              ดูทั้งหมด
            </Typography>
          </Button>
        </Link>
      </Box>
      <Grid container spacing={12}>
        {casedata.map((items, index) => (
          <Grid item md={6}>
            <Paper sx={{ height: 160, borderRadius: 3, p: 4 }}>
              <Grid container>
                <Grid item md={6}>
                  {" "}
                  <Typography fontWeight="bold">{items.case_title}</Typography>
                  <Typography mt={4} color="grey">
                    เวลาที่แจ้ง:{" "}
                    {new Date(items.created_date).toLocaleString("th-TH")}
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography justifySelf="right">
                    {(items.status_id === 1 && (
                      <>
                        <ErrorOutlineIcon sx={{ color: amber[400] }} />
                        <Typography sx={{ mt: 3 }}>รอดำเนินการ</Typography>
                      </>
                    )) ||
                      (items.status_id === 2 && (
                        <>
                          <HandymanIcon sx={{ color: "red" }} />
                          <Typography sx={{ mt: 3 }}>กำลังดำเนินการ</Typography>
                        </>
                      )) ||
                      (items.status_id === 3 && (
                        <>
                          <PendingActionsRoundedIcon
                            sx={{ color: indigo[600] }}
                          />
                          <Typography sx={{ mt: 3 }}>ยืนยันการซ่อม</Typography>
                        </>
                      )) ||
                      (items.status_id === 4 && (
                        <>
                          <AccessTimeRoundedIcon sx={{ color: "violet" }} />
                          <Typography sx={{ mt: 3 }}>รออะไหล่</Typography>
                        </>
                      )) ||
                      (items.status_id === 5 && (
                        <>
                          <AccessTimeRoundedIcon sx={{ color: "red" }} />
                          <Typography sx={{ mt: 3 }}>
                            เลยกำหนดการซ่อม
                          </Typography>
                        </>
                      )) ||
                      (items.status_id === 6 && (
                        <>
                          <CheckCircleOutlineRoundedIcon
                            sx={{ color: "green" }}
                          />
                          <Typography sx={{ mt: 3 }}>เสร็จสิ้น</Typography>
                        </>
                      ))}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
export default User;
