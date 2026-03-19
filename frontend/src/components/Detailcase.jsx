import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button, Paper, Grid, Stack } from "@mui/material";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import OutlinedFlagRoundedIcon from "@mui/icons-material/OutlinedFlagRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { amber, indigo, lightBlue } from "@mui/material/colors";
import { Link } from "react-router-dom";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { lightGreen, grey } from "@mui/material/colors";
import HandymanIcon from "@mui/icons-material/Handyman";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

function Detailcase() {
  const { ticket_id } = useParams();
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState([]);
  const role_id = useSelector((state) => state.user.role);
  const user_id = useSelector((state) => state.user.user_id);
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log("role", role_id);
  const waitingForPartButton = async (ticket_id) => {
    try {
      await axios.patch(`${apiUrl}/ticket/${user_id}/${ticket_id}`, {
        status_id: 6,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const startJobForTechnician = async (ticket_id) => {
    try {
      if (window.confirm("เริ่มการทำงาน?")) {
        await axios.patch(`${apiUrl}/ticket/${user_id}/${ticket_id}`, {
          status_id: 3,
        });
        await fetchDetail(); // 👈 รีโหลดข้อมูลใหม่ทันที
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formatDateTime = (iso) => {
    if (!iso) return "-";

    return new Date(iso).toLocaleString("th-TH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const handleUpdateStatusTicketByUser = (status_id) => {
    try {
      if (window.confirm("ยืนยันการซ่อม")) {
        axios
          .patch(`${apiUrl}/ticket/${user_id}/${ticket_id}`, {
            status_id,
          })
          .then(() => navigate(-1));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDetail = async () => {
    try {
      const res = await axios.get(`${apiUrl}/ticket/detail/${ticket_id}`);
      setTicketData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [ticket_id]);
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5011/ticket/detail/${ticket_id}`)
  //     .then(function (response) {
  //       setTicketData(response.data);
  //       console.log("response", response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })
  //     .finally(function () {});
  // }, [ticket_id]);
  return (
    <Box sx={{ overflowY: "scroll", height: "100vh" }}>
      <Box sx={{ marginX: "25%", mt: 2 }}>
        <Typography variant="h4" fontWeight="fontWeightBold">
          รายละเอียดการซ่อม
        </Typography>
        <Typography variant="subtitle1" color="grey">
          ข้อมูลและสถานะการดำเนินการ
        </Typography>
        {ticketData.map((items, index) => (
          <Grid container spacing={2}>
            <Grid item md={8}>
              <Paper sx={{ p: 4, mt: 3, borderRadius: 3 }}>
                <Typography variant="h5" fontWeight="fontWeightBold">
                  {items.title}
                </Typography>
                <Box sx={{ p: 2 }}>
                  <Grid container>
                    <Grid item md={6}>
                      <Stack direction="row" spacing={2}>
                        {
                          <DateRangeRoundedIcon
                            sx={{ color: "grey", fontSize: 30 }}
                          />
                        }

                        <Stack>
                          <Typography color="grey" alignContent="center">
                            วันที่แจ้ง
                          </Typography>
                          <Typography>
                            {new Date(items.created_at).toLocaleString(
                              "th-TH",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item md={6}>
                      <Stack direction="row">
                        <OutlinedFlagRoundedIcon sx={{ color: "grey" }} />
                        <Stack>
                          <Typography color="grey">ประเภทของปัญหา</Typography>
                          <Typography>
                            {items.issues_categories_name}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
                <hr />
                <Typography
                  variant="subtitle1"
                  fontWeight="fontWeightBold"
                  sx={{ p: 1 }}
                >
                  รายละเอียดปัญหา
                </Typography>
                <Typography sx={{ p: 1, color: "grey" }}>
                  {items.description}
                </Typography>
              </Paper>
            </Grid>
            {/*บนขวา*/}
            <Grid item md={4}>
              <Paper sx={{ mt: 3, p: 4 }}>
                <Typography variant="subtitle1" fontWeight="fontWeightBold">
                  ข้อมูลผู้แจ้ง
                </Typography>
                <Stack direction="row" spacing={2}>
                  <AccountCircleRoundedIcon
                    sx={{ fontSize: 50, color: lightBlue[400] }}
                  />
                  <Stack>
                    <Typography>{items.name}</Typography>
                    <Typography color="grey">{items.dep_name}</Typography>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
            {/* ล่างซ้าย */}
            <Grid container spacing={2}>
              <Grid item md={8}>
                <Paper
                  sx={{
                    ml: 2,
                    p: 4,
                    mt: 3,
                    borderRadius: 3,
                    pb: 14,
                  }}
                >
                  <Typography variant="h5" fontWeight="fontWeightBold">
                    ประวัติการดำเนินงาน
                  </Typography>
                  <Timeline
                    position="right" // ✅ ให้เส้นอยู่ซ้าย + ข้อความอยู่ขวา
                    sx={{
                      overflow: "visible", // ป้องกันโดนตัดขอบล่าง
                      "& .MuiTimelineItem-root": {
                        minHeight: "unset", // ยกเลิกความสูงบังคับของแต่ละ item
                      },
                      "& .MuiTimelineItem-root:before": {
                        flex: 0,
                        padding: 0, // ตัดเส้น/padding ฝั่งซ้ายของ item
                      },
                    }}
                  >
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot
                          sx={{ bgcolor: grey[100], color: amber[500] }}
                        >
                          <ErrorOutlineRoundedIcon />
                        </TimelineDot>
                        <TimelineConnector></TimelineConnector>
                      </TimelineSeparator>
                      <TimelineContent sx={{ py: 1 }}>
                        <Typography>เปิดงาน</Typography>
                        {items.created_at && (
                          <Typography>
                            วันที่: {formatDateTime(items.created_at)}
                          </Typography>
                        )}
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot
                          sx={{ bgcolor: grey[100], color: indigo[500] }}
                        >
                          {" "}
                          <AccessTimeRoundedIcon />
                        </TimelineDot>
                        <TimelineConnector></TimelineConnector>
                      </TimelineSeparator>
                      <TimelineContent sx={{ py: 1 }}>
                        <Typography>มอบหมายแล้ว</Typography>
                        {items.assigned_at && (
                          <Typography>
                            วันที่: {formatDateTime(items.assigned_at)}
                          </Typography>
                        )}
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot sx={{ bgcolor: grey[100] }}>
                          <HandymanIcon sx={{ color: "red" }} />
                        </TimelineDot>
                        <TimelineConnector></TimelineConnector>
                      </TimelineSeparator>
                      <TimelineContent sx={{ py: 1 }}>
                        <Typography>กำลังดำเนินการ</Typography>
                        {items.started_at && (
                          <Typography>
                            วันที่: {formatDateTime(items.started_at)}
                          </Typography>
                        )}
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot sx={{ bgcolor: grey[100] }}>
                          <HourglassEmptyIcon sx={{ color: "purple" }} />
                        </TimelineDot>
                        <TimelineConnector></TimelineConnector>
                      </TimelineSeparator>
                      <TimelineContent sx={{ py: 1 }}>
                        <Typography>รอผู้ใช้ยืนยัน</Typography>
                        {items.work_completed_at && (
                          <Typography>
                            วันที่: {formatDateTime(items.work_completed_at)}
                          </Typography>
                        )}
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot sx={{ bgcolor: grey[100] }}>
                          <CheckCircleOutlineRoundedIcon
                            sx={{ color: lightGreen[700] }}
                          />
                        </TimelineDot>
                      </TimelineSeparator>
                      <TimelineContent sx={{ py: 1 }}>
                        <Typography>เสร็จสิ้น</Typography>
                        <Typography>
                          {(items.closed_at && (
                            <Typography>
                              วันที่ : {formatDateTime(items.closed_at)}
                            </Typography>
                          )) || <Typography></Typography>}
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                  </Timeline>
                </Paper>
              </Grid>
              <Grid item md={4}>
                <Paper sx={{ mt: 3, p: 4, borderRadius: 3 }}>
                  <Typography variant="subtitle1" fontWeight="fontWeightBold">
                    การดำเนินการ
                  </Typography>

                  {/* Technician */}
                  {role_id === 3 && items.status_id === 2 && (
                    <Button
                      variant="contained"
                      onClick={() => startJobForTechnician(ticket_id)}
                    >
                      เริ่มงาน
                    </Button>
                  )}

                  {role_id === 3 && items.status_id === 3 && (
                    <>
                      <Link to={`/technician/ticket/${ticket_id}/repair`}>
                        <Button variant="contained">บันทึกการซ่อม</Button>
                      </Link>
                      <Button
                        onClick={() => waitingForPartButton(ticket_id)}
                        sx={{ mt: 2 }}
                        variant="contained"
                        color="secondary"
                      >
                        รออะไหล่
                      </Button>
                    </>
                  )}
                  {role_id === 3 && items.status_id === 5 && (
                    <>
                      <Button variant="contained" disabled>
                        บันทึกการซ่อม
                      </Button>
                    </>
                  )}
                  {role_id === 3 && items.status_id === 6 && (
                    <>
                      <Button variant="contained" disabled>
                        บันทึกการซ่อม
                      </Button>
                    </>
                  )}
                  {/* User confirm */}

                  {role_id === 4 && items.status_id === 4 && (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleUpdateStatusTicketByUser(5)}
                    >
                      ยืนยันการซ่อม
                    </Button>
                  )}
                  {/* Manager */}
                  {role_id === 2 && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        navigate(`/manager/ticket/assign/${ticket_id}`)
                      }
                    >
                      มอบหมายงาน
                    </Button>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}

export default Detailcase;
