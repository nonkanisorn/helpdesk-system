import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
function Reportcasetech() {
  const navigate = useNavigate();
  const technician_id = useSelector((state) => state.user.user_id);
  const [ticketData, setticketData] = useState([]);
  const status_id = 4;
  const [refresh, setRefresh] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const technicianStatusMap = {
    1: "งานใหม่",
    2: "ได้รับมอบหมาย",
    3: "กำลังดำเนินการ",
    4: "บันทึกผลแล้ว",
    5: "รอผู้ใช้ยืนยัน",
    6: "ปิดงานแล้ว",
    7: "รออะไหล่",
  };
  const topagedetail = (ticket_id) => {
    navigate(`/technician/repairs/${ticket_id}`);
  };
  const waitingforpart = (ticket_id) => {
    axios
      .patch(`${apiUrl}/ticket/${technician_id}/${ticket_id}`, {
        status_id,
      })
      .then(setRefresh(true));
  };
  useEffect(() => {
    axios
      .get(`${apiUrl}/tickettech/${technician_id}`)
      .then(function (response) {
        setticketData(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, [refresh]);

  return (
    <Box>
      <Typography variant="h3">รายการแจ้งซ่อม</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ลำดับ</TableCell>
              <TableCell>ชื่องาน</TableCell>
              <TableCell>รายละเอียดผู้แจ้ง</TableCell>
              <TableCell>รายละเอียดงาน</TableCell>
              <TableCell>สถานะ</TableCell>
              <TableCell>ดำเนินการ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ticketData.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.usersname}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{technicianStatusMap[item.status_id]}</TableCell>

                <TableCell>
                  <Button
                    size="small"
                    // sx={{ fontSize: 7, padding: 0.5 }}
                    variant="contained"
                    color="success"
                    onClick={() => topagedetail(item.ticket_id)}
                    sx={{ mr: 2 }}
                  >
                    จัดการงาน
                  </Button>
                  {/* <Button variant="contained" color="error" size="small"> */}
                  {/*   ซ่อมไม่ได้ */}
                  {/* </Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
export default Reportcasetech;
