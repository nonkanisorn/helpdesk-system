import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Paper, Typography, Grid, Chip } from "@mui/material";

import Button from "@mui/material/Button";

function History() {
  const { case_id } = useParams();
  const [casedatabyID, setcasedatabyID] = useState([]);
  const [imgurl, setImgUrls] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:5011/caseid/${case_id}`)
      .then(function(response) {
        // console.log(response)
        setcasedatabyID(response.data);
        console.log("case", casedatabyID);
        const urls = response.data.map((casedata) => {
          const bufferData = new Uint8Array(casedata.case_img.data);
          const blob = new Blob([bufferData], { type: "image/jpeg" });

          return URL.createObjectURL(blob);
        });
        setImgUrls(urls);
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() { });
  }, [case_id]);
  console.log(casedatabyID);
  console.log("ddd");
  return (
    <Box sx={{ p: 3 }}>
      {casedatabyID.map((data, index) => (
        <Paper
          key={data.id}
          sx={{
            p: 5,
            maxWidth: 900,
            mx: "auto",
            borderRadius: 3,
            boxShadow: 4,
          }}
        >
          {/* หัวเรื่อง */}
          <Typography variant="h4" align="center" gutterBottom>
            รายละเอียดเคส
          </Typography>

          <Grid container spacing={3} mt={2}>
            {/* ชื่องาน */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                ชื่องาน
              </Typography>
              <Typography variant="body1">{data.case_title}</Typography>
            </Grid>

            {/* รายละเอียดงาน */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                รายละเอียดงาน
              </Typography>
              <Typography variant="body1">{data.case_detail}</Typography>
            </Grid>

            {/* เวลาแจ้ง */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                เวลาแจ้ง
              </Typography>
              <Typography variant="body1">
                {new Date(data.created_date).toLocaleString("th-TH", {
                  dateStyle: "short",
                  timeStyle: "medium",
                })}
              </Typography>
            </Grid>

            {/* เวลามอบหมาย */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                เวลาที่มอบหมายงาน
              </Typography>
              <Typography variant="body1">
                {new Date(data.assigned_date).toLocaleString("th-TH", {
                  dateStyle: "short",
                  timeStyle: "medium",
                })}
              </Typography>
            </Grid>

            {/* วันที่เสร็จ */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                วันที่ช่างทำเสร็จ
              </Typography>
              {data.work_completed_date ? (
                <Chip
                  label={new Date(data.work_completed_date).toLocaleString(
                    "th-TH",
                    {
                      dateStyle: "short",
                      timeStyle: "medium",
                    },
                  )}
                  color="success"
                />
              ) : (
                <Chip label="ยังไม่เสร็จ" color="warning" />
              )}
            </Grid>

            {/* การยืนยัน */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                การยืนยันการซ่อม
              </Typography>
              {data.closed_date ? (
                <Chip
                  label={new Date(data.closed_date).toLocaleString("th-TH", {
                    dateStyle: "short",
                    timeStyle: "medium",
                  })}
                  color="success"
                />
              ) : (
                <Chip label="ยังไม่ได้รับการยืนยัน" color="error" />
              )}
            </Grid>
          </Grid>

          {/* แสดงรูปถ้ามี */}
          {imgurl.length > 0 && (
            <Box mt={4} textAlign="center">
              <Typography variant="subtitle2" gutterBottom>
                รูปภาพประกอบ
              </Typography>
              {imgurl.map((url, idx) => (
                <Box
                  key={idx}
                  component="img"
                  src={url}
                  alt={`case-img-${idx}`}
                  sx={{
                    maxWidth: "100%",
                    borderRadius: 2,
                    boxShadow: 2,
                    mb: 2,
                  }}
                />
              ))}
            </Box>
          )}
        </Paper>
      ))}
    </Box>
    // <Box>
    //   <Paper sx={{ height: 500, width: "100%" }}>
    //     {casedatabyID.map((data, index) => (
    //       <Box key={data.id}>
    //         <Typography align="center" variant="h3" mb={3}>
    //           รายละเอียดเคส
    //         </Typography>
    //         <Box ml={3}>
    //           <Typography variant="h6" sx={{ mb: 2 }}>
    //             ชื่องาน:{data.case_title}
    //           </Typography>
    //           <Typography variant="h6" sx={{ mb: 2 }}>
    //             รายละเอียดงาน:{data.case_detail}
    //           </Typography>
    //           <Typography variant="h6" sx={{ mb: 2 }}>
    //             เวลาที่แจ้ง:
    //             {new Date(data.created_date).toLocaleString("th-TH", {
    //               dateStyle: "short",
    //               timeStyle: "medium",
    //             })}
    //           </Typography>
    //
    //           <Typography variant="h6" sx={{ mb: 2 }}>
    //             เวลาที่มอบหมายงานให้ช่าง:
    //             {new Date(data.assigned_date).toLocaleString("th-TH", {
    //               dateStyle: "short",
    //               timeStyle: "medium",
    //             })}
    //           </Typography>
    //           <Typography variant="h6" sx={{ mb: 2 }}>
    //             วันที่ช่างทำเสร็จ:
    //             {data.completed_date === null
    //               ? "ยังไม่เสร็จ"
    //               : new Date(data.work_completed_date).toLocaleString("th-TH", {
    //                 dateStyle: "short",
    //                 timeStyle: "medium",
    //               })}
    //           </Typography>
    //           <Typography variant="h6" sx={{ mb: 2 }}>
    //             วันที่ได้รับการยืนยันว่าซ่อมแล้ว:
    //             {data.closed_date === null
    //               ? "ยังไม่ได้รับการยืนยัน"
    //               : new Date(data.closed_date).toLocaleString("th-TH", {
    //                 dateStyle: "short",
    //                 timeStyle: "medium",
    //               })}
    //           </Typography>
    //         </Box>
    //       </Box>
    //     ))}
    //   </Paper>
    // </Box>
  );
}

export default History;
