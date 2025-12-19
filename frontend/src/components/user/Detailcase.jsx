import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button, Paper, Grid, Stack } from "@mui/material";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import OutlinedFlagRoundedIcon from "@mui/icons-material/OutlinedFlagRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { lightBlue } from "@mui/material/colors";
function Detailcase() {
  const { case_id } = useParams();
  const navigate = useNavigate();
  const [caseData, setcaseData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5011/case/detail/${case_id}`)
      .then(function (response) {
        setcaseData(response.data);
        console.log("response", response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);
  console.log("casedaaaa", caseData);
  return (
    <Box sx={{ marginX: "25%", mt: 5 }}>
      <Typography variant="h4" fontWeight="fontWeightBold">
        รายละเอียดการซ่อม
      </Typography>
      <Typography variant="subtitle1" color="grey">
        ข้อมูลและสถานะการดำเนินการ
      </Typography>
      {caseData.map((items, index) => (
        <Grid container spacing={2}>
          <Grid item md={8}>
            <Paper sx={{ p: 4, mt: 3, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight="fontWeightBold">
                {items.case_title}
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
                          {new Date(items.created_date).toLocaleString(
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
                        <Typography>{items.categories_name}</Typography>
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
                {items.case_detail}
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
              <Paper sx={{ ml: 2, p: 4, mt: 3, borderRadius: 3 }}>
                <Typography variant="h5" fontWeight="fontWeightBold">
                  ประวัติการดำเนินการ
                </Typography>
                <Box sx={{ p: 2 }}>
                  <Grid container>
                    <Grid item md={6}>
                      <Typography color="grey">วันที่แจ้ง</Typography>
                      <Typography>date</Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography color="grey">แผนก</Typography>
                      <Typography>dep</Typography>
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
                <Typography sx={{ p: 1, color: "grey" }}>data</Typography>
              </Paper>
            </Grid>
            {/* ล่างขวา*/}
            <Grid item md={4}>
              <Paper sx={{ mt: 3, p: 4, borderRadius: 3 }}>
                <Typography variant="subtitle1" fontWeight="fontWeightBold">
                  การดำเนินการ
                </Typography>
                <Button>ยืนยันการซ่อม</Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}

export default Detailcase;
