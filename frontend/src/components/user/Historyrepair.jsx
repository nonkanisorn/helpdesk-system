import React, { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Grid,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
} from "@mui/material";

function Historyrepair() {
  const now = new Date();

  const formatted = (date) => {
    return new Date(date).toLocaleString("th-TH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };
  const [ticketData, setticketData] = useState([]);
  const user_id = useSelector((state) => state.user.user_id);

  // ✅ เปลี่ยนเป็น key ของกลุ่มสถานะ (อ่านง่าย + filter ถูก)
  const [groupKey, setGroupKey] = useState("all");

  // ✅ กลุ่มสถานะสำหรับ USER (ตรงกับ DB)
  // 1 Open, 2 Assigned, 3 In Progress, 4 Technician Complete, 5 Waiting for User Confirmation, 6 Closed, 7 Waiting for Parts
  const userStatusGroups = {
    all: { label: "ทั้งหมด", ids: null },

    // Open + Assigned
    pending: { label: "รอดำเนินการ", ids: [1, 2] },

    // In Progress + Waiting for Parts
    progress: { label: "อยู่ระหว่างซ่อม", ids: [3, 6] },

    // Waiting for User Confirmation
    confirm: { label: "รอการยืนยันจากคุณ", ids: [4] },

    // Closed
    done: { label: "เสร็จสิ้นแล้ว", ids: [5] },
  };

  // ✅ label สำหรับ chip (รองรับครบทุกสถานะที่ user เห็น)
  const userStatusLabelMap = {
    1: "รอดำเนินการ",
    2: "รอดำเนินการ",
    3: "อยู่ระหว่างซ่อม",
    4: "รอการยืนยันจากคุณ",
    5: "เสร็จสิ้น",
    6: "อยู่ระหว่างซ่อม",
  };

  // ✅ helper นับ + กรอง
  const countByGroup = (key) => {
    const ids = userStatusGroups[key].ids;
    if (!ids) return ticketData.length;
    return ticketData.filter((t) => ids.includes(t.status_id)).length;
  };

  const filterByGroup = (key) => {
    const ids = userStatusGroups[key].ids;
    if (!ids) return ticketData;
    return ticketData.filter((t) => ids.includes(t.status_id));
  };

  // ✅ โหลดข้อมูล (ใส่ user_id ใน dependency)
  useEffect(() => {
    if (!user_id) return;

    axios
      .get(`http://localhost:5011/ticketuser/${user_id}`)
      .then((response) => {
        setticketData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user_id]);

  // ✅ ใช้ในการ render
  const filteredTickets = filterByGroup(groupKey);

  // ✅ ฟังก์ชัน style ของ chip ตาม status
  const chipStyleByStatus = (status_id) => {
    // Done
    if (status_id === 6) {
      return {
        bgcolor: "#E8F9EE",
        border: 1,
        borderColor: "#C1EED2",
        color: "#2BC764",
      };
    }

    // Progress / Waiting parts
    if (status_id === 3 || status_id === 7) {
      return {
        bgcolor: "#FDF5E6",
        border: 1,
        borderColor: "#FBE5BB",
        color: "#F7B543",
      };
    }
    if (status_id === 4 || status_id === 5) {
      return {
        bgcolor: "#E8F1FF",
        border: 1,
        borderColor: "#BFD8FF",
        color: "#2F6FED",
      };
    }
    // Confirm

    // Pending (Open/Assigned)
    if (status_id === 1 || status_id === 2) {
      return {
        bgcolor: "#F3F4F6",
        border: 1,
        borderColor: "#E5E7EB",
        color: "#374151",
      };
    }

    return {};
  };

  return (
    <>
      <Box
        sx={{
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            flex: 1,
            pb: 16,
            minHeight: 0,
            overflowY: "auto",
            scrollbarGutter: "stable",
          }}
        >
          <Box sx={{ maxWidth: 1100, mx: "auto", px: 2, pt: 1 }}>
            <Box sx={{ mt: 5 }}>
              <Typography variant="h4" fontWeight="fontWeightBold">
                ประวัติการซ่อมของฉัน
              </Typography>
              <Typography variant="subtitle1" color="grey">
                รายการคำขอซ่อมทั้งหมดของคุณ
              </Typography>

              {/* ✅ Summary Cards */}
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  mt: 4,
                }}
              >
                {[
                  ["ทั้งหมด", countByGroup("all")],
                  ["รอดำเนินการ", countByGroup("pending")],
                  ["อยู่ระหว่างซ่อม", countByGroup("progress")],
                  ["รอการยืนยันจากคุณ", countByGroup("confirm")],
                  ["เสร็จสิ้นแล้ว", countByGroup("done")],
                ].map(([label, count]) => (
                  <Paper
                    key={label}
                    sx={{
                      flex: "1 1 100px",
                      height: 120,
                      borderRadius: 3,
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h4">{count}</Typography>
                    <Typography>{label}</Typography>
                  </Paper>
                ))}
              </Stack>

              {/* ✅ Filter Tabs */}
              <Paper
                sx={{
                  width: "55%",
                  bgcolor: "white",
                  mb: 3,
                  mt: 5,
                }}
              >
                <ToggleButtonGroup
                  value={groupKey}
                  exclusive
                  color="primary"
                  onChange={(e, newValue) => {
                    if (newValue !== null) setGroupKey(newValue);
                  }}
                  sx={{ gap: 1, p: 2, height: 50 }}
                >
                  <ToggleButton value="all" sx={{ whiteSpace: "nowrap" }}>
                    ทั้งหมด
                  </ToggleButton>
                  <ToggleButton value="pending" sx={{ whiteSpace: "nowrap" }}>
                    รอดำเนินการ
                  </ToggleButton>
                  <ToggleButton value="progress" sx={{ whiteSpace: "nowrap" }}>
                    อยู่ระหว่างซ่อม
                  </ToggleButton>
                  <ToggleButton value="confirm" sx={{ whiteSpace: "nowrap" }}>
                    ยืนยันการซ่อม
                  </ToggleButton>
                  <ToggleButton value="done" sx={{ whiteSpace: "nowrap" }}>
                    เสร็จสิ้น
                  </ToggleButton>
                </ToggleButtonGroup>
              </Paper>

              {/* ✅ List */}
              <Grid container spacing={2} sx={{ alignContent: "flex-start" }}>
                {filteredTickets.map((items) => {
                  const chipLabel = userStatusLabelMap[items.status_id];

                  return (
                    <Grid key={items.ticket_id} item xs={12} md={6}>
                      <Paper
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          minHeight: 200,
                        }}
                      >
                        <Stack
                          sx={{ p: 2 }}
                          direction="row"
                          justifyContent="space-between"
                        >
                          <Typography>{items.title}</Typography>

                          {chipLabel ? (
                            <Chip
                              label={chipLabel}
                              sx={chipStyleByStatus(items.status_id)}
                            />
                          ) : null}
                        </Stack>

                        <Box sx={{ p: 2 }}>
                          <Typography>{items.description}</Typography>
                          <Typography>
                            แจ้งเมื่อ : {formatted(items.created_at)}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginX: "5%",
                            pb: 2,
                          }}
                        >
                          <Button
                            component={Link}
                            to={`/user/repair-detail/${items.ticket_id}`}
                            sx={{
                              bgcolor: "#FAFAFA",
                              border: 1,
                              borderRadius: 3,
                              width: "100%",
                            }}
                          >
                            ดูรายละเอียด
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Historyrepair;
