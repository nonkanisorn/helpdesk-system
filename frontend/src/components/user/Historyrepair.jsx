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
import { useNavigate } from "react-router-dom";
function Historyrepair() {
  const [caseData, setcaseData] = useState([]);
  const user_id = useSelector((state) => state.user.users_id);
  const navigate = useNavigate();
  const [selected, setSelected] = useState("1");
  const [controlShowData, setControlShowData] = useState(0);

  console.log("datacas", caseData);
  const handleChange = (event, newSelected) => {
    if (newSelected !== null) {
      setSelected(event.target.value);
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5011/caseuser/${user_id}`)
      .then(function (response) {
        setcaseData(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);
  console.log(
    "casesta1",
    caseData.filter((items) => items.status_id === 1),
  );
  const status_6 = caseData.filter((item) => item.status_id === 6).length;
  const status_5 = caseData.filter((item) => item.status_id === 5).length;
  const status_4 = caseData.filter((item) => item.status_id === 4).length;
  const status_3 = caseData.filter((item) => item.status_id === 3).length;
  const status_2 = caseData.filter((item) => item.status_id === 2).length;
  const status_1 = caseData.filter((item) => item.status_id === 1).length;
  const allStatus =
    status_1 + status_2 + status_3 + status_4 + status_5 + status_6;

  const filterStatus = () => {
    return caseData.filter((item) => {
      if (controlShowData === 0) return true;
      return item.status_id === controlShowData;
    });
  };
  console.log("fil", filterStatus());
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
              <Typography variant="subtitle1" color=" grey">
                รายการคำขอซ่อมทั้งหมดของคุณ
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  flexWrap: "wrap", // ให้ห่อบรรทัดเมื่อจอแคบ
                  justifyContent: "space-between",
                  mt: 4,
                }}
              >
                {[
                  ["ทั้งหมด", allStatus],
                  ["รอรับเรื่อง", status_1],
                  ["อยู่ระหว่างซ่อม", status_2],
                  ["ยืนยันการซ่อม", status_3],
                  ["เสร็จสิ้น", status_6],
                ].map(([label, count]) => (
                  <Paper
                    key={label}
                    sx={{
                      flex: "1 1 100px", // แต่ละกล่องกว้างอย่างน้อย 200px
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
              <Paper
                sx={{
                  width: "55%",
                  bgcolor: "white",
                  mb: 3,
                  mt: 5,
                }}
              >
                <ToggleButtonGroup
                  value={selected}
                  color="primary"
                  onChange={handleChange}
                  sx={{ gap: 1, p: 2, height: 50 }}
                >
                  <ToggleButton
                    onClick={() => setControlShowData(0)}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    ทั้งหมด
                  </ToggleButton>
                  <ToggleButton
                    onClick={() => setControlShowData(1)}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    รอรับเรื่อง
                  </ToggleButton>
                  <ToggleButton
                    onClick={() => setControlShowData(2)}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    อยู่ระหว่างซ่อม
                  </ToggleButton>
                  <ToggleButton
                    onClick={() => setControlShowData(3)}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    ยืนยันการซ่อม
                  </ToggleButton>
                  <ToggleButton
                    onClick={() => setControlShowData(6)}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    เสร็จสิ้น
                  </ToggleButton>
                </ToggleButtonGroup>
              </Paper>

              <Grid
                container
                spacing={2}
                sx={{
                  alignContent: "flex-start",
                }}
              >
                {filterStatus().map((items, index) => (
                  <Grid item xs={12} md={6}>
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
                        <Typography>{items.case_title}</Typography>
                        {items.status_id === 6 ? (
                          <Chip
                            label={items.status_name}
                            // color="#E8F9EE"
                            // variant="outlined"
                            sx={{
                              bgcolor: "#E8F9EE",
                              border: 1,
                              borderColor: "#C1EED2",
                              color: "#2BC764",
                            }}
                          ></Chip>
                        ) : items.status_id === 5 ? (
                          <Chip
                            label={items.status_name}
                            // color="#E8F9EE"
                            // variant="outlined"
                            sx={{
                              bgcolor: "#E8F9EE",
                              border: 1,
                              borderColor: "#C1EED2",
                              color: "#2BC764",
                            }}
                          ></Chip>
                        ) : items.status_id === 4 ? (
                          <Chip
                            label={items.status_name}
                            // color="#E8F9EE"
                            // variant="outlined"
                            sx={{
                              bgcolor: "#E8F9EE",
                              border: 1,
                              borderColor: "#C1EED2",
                              color: "#2BC764",
                            }}
                          ></Chip>
                        ) : items.status_id === 3 ? (
                          <Chip
                            label="ยืนยันการซ่อม"
                            // color="#E8F9EE"
                            // variant="outlined"
                            sx={{
                              bgcolor: "#FDF5E6",
                              border: 1,
                              borderColor: "#FBE5BB",
                              color: "#F7B543",
                            }}
                          ></Chip>
                        ) : items.status_id === 2 ? (
                          <Chip
                            label="อยู่ระหว่างซ่อม"
                            // color="#E8F9EE"
                            // variant="outlined"
                            sx={{
                              bgcolor: "#E9EFFC",
                              border: 1,
                              borderColor: "#C6D6F8",
                              color: "#3E76EE",
                            }}
                          ></Chip>
                        ) : items.status_id === 1 ? (
                          <Chip
                            label="รอรับเรื่อง"
                            // color="#E8F9EE"
                            // variant="outlined"
                            sx={{
                              bgcolor: "#E8F9EE",
                              border: 1,
                              borderColor: "#C1EED2",
                              color: "#2BC764",
                            }}
                          ></Chip>
                        ) : null}
                      </Stack>
                      <Box sx={{ p: 2 }}>
                        <Typography>{items.case_detail}</Typography>
                        <Typography>แจ้งเมื่อ</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          marginX: "5%",
                        }}
                      >
                        <Button
                          component={Link}
                          to={{
                            pathname: `/user/repair-detail/${items.case_id}`,
                          }}
                          sx={{
                            bgcolor: "#FAFAFA",
                            border: 1,
                            borderRadius: 3,
                            width: "100%",
                          }}
                        >
                          ดูลายละเอียด
                        </Button>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              {/* <Grid */}
              {/*   container */}
              {/*   spacing={2} */}
              {/*   sx={{ */}
              {/*     alignContent: "flex-start", */}
              {/*   }} */}
              {/* > */}
              {/*   {caseData.map((items, index) => ( */}
              {/*   ))} */}
              {/* </Grid> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default Historyrepair;
