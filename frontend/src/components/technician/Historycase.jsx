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
function Historycase() {
  const technicianStatusMap = {
    1: "งานใหม่",
    2: "ได้รับมอบหมาย",
    3: "กำลังดำเนินการ",
    4: "บันทึกผลแล้ว",
    5: "รอผู้ใช้ยืนยัน",
    6: "ปิดงานแล้ว",
    7: "รออะไหล่",
  };
  const navigate = useNavigate();
  const technician_id = useSelector((state) => state.user.user_id);
  const [ticketData, setticketData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const topagedetail = (ticket_id) => {
    navigate(`/technician/repairs/${ticket_id}`);
  };
  useEffect(() => {
    axios
      .get(`${apiUrl}/tickets/history-technician/${technician_id}`)
      .then(function (response) {
        setticketData(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);

  return (
    <Box>
      <Typography variant="h3">ประวัติการซ่อม</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ลำดับ</TableCell>
              <TableCell>หัวข้อ</TableCell>
              <TableCell>รายละเอียด</TableCell>
              <TableCell>สถานะ</TableCell>
              <TableCell>ประวัติ</TableCell>
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
                <TableCell>{item.description}</TableCell>
                <TableCell>{technicianStatusMap[item.status_id]}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    sx={{ padding: 0.5 }}
                    variant="contained"
                    onClick={() => topagedetail(item.ticket_id)}
                  >
                    ประวัติ
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
export default Historycase;
