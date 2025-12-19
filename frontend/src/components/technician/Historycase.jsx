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
  const navigate = useNavigate();
  const technician_id = useSelector((state) => state.user.users_id);
  const [caseData, setcaseData] = useState([]);
  const topagedetail = (case_id) => {
    navigate(`/technician/detailcasetechfinish/${case_id}`);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5011/Casetechhistory/${technician_id}`)
      .then(function(response) {
        setcaseData(response.data);
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() { });
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
              <TableCell>คนที่มอบหมายงาน</TableCell>
              <TableCell>สถานะ</TableCell>
              <TableCell>ประวัติ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {caseData.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{item.case_title}</TableCell>
                <TableCell>{item.case_detail}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.status_name}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    sx={{ padding: 0.5 }}
                    variant="contained"
                    onClick={() => topagedetail(item.case_id)}
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
