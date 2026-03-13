import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Paper, Typography } from "@mui/material";

import Button from "@mui/material/Button";

function Casedetailstatus() {
  const { case_id } = useParams();
  const [casedatabyID, setcasedatabyID] = useState([]);
  const [imgurl, setImgUrls] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:5011/caseid/${case_id}`)
      .then(function (response) {
        setcasedatabyID(response.data);
        const urls = response.data.map((casedata) => {
          const bufferData = new Uint8Array(casedata.case_img.data);
          const blob = new Blob([bufferData], { type: "image/jpeg" });

          return URL.createObjectURL(blob);
        });
        setImgUrls(urls);
      })
      .catch(function (error) {})
      .finally(function () {});
  }, [case_id]);
  return (
    <Box>
      <Paper sx={{ height: 400, width: "100%" }}>
        {casedatabyID.map((data, index) => (
          <Box key={data.id}>
            <Typography align="center" variant="h3" mb={3}>
              รายละเอียดเคส
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              ชื่องาน:{data.case_title}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              รายละเอียดงาน:{data.case_detail}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              เวลาที่แจ้ง:
              {new Date(data.created_date).toLocaleString("th-TH", {
                dateStyle: "short",
                timeStyle: "medium",
              })}
            </Typography>

            <Typography variant="h6" sx={{ mb: 2 }}>
              เวลาที่มอบหมายงานให้ช่าง:
              {new Date(data.assigned_date).toLocaleString("th-TH", {
                dateStyle: "short",
                timeStyle: "medium",
              })}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              วันที่ช่างทำเสร็จ:
              {data.work_completed_date === null
                ? "ยังไม่เสร็จ"
                : new Date(data.work_completed_date).toLocaleString("th-TH", {
                    dateStyle: "short",
                    timeStyle: "medium",
                  })}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              วันที่ได้รับการยืนยันว่าซ่อมแล้ว:
              {data.closed_date === null
                ? "ยังไม่ได้รับการยืนยัน"
                : new Date(data.work_completed_date).toLocaleString("th-TH", {
                    dateStyle: "short",
                    timeStyle: "medium",
                  })}
            </Typography>
          </Box>
        ))}
      </Paper>
    </Box>
    // <div>
    //   {casedatabyID.map((casedata) => (
    //     <div key={casedata.case_id}>
    //       <h1>หัวข้อ: {casedata.case_title}</h1>
    //       <img src={imgurl} alt="รุป" width={500} height={400} />
    //       <div>{casedata.case_detail}</div>
    //       <span>รายชื่อช่างที่ได้รับมอบหมาย</span> <span>{casedata.name}</span>
    //       <div>
    //         <Button onClick={() => navigate("/manager/statuscase")}>
    //           Back
    //         </Button>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
}

export default Casedetailstatus;
