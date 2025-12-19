import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Statuscase() {
  const [caseData, setcaseData] = useState([]);
  const navigate = useNavigate();
  const topagedetail = (case_id) => {
    navigate(`/manager/casedetail/${case_id}`);
  };
  console.log(caseData);
  useEffect(() => {
    axios
      .get(`http://localhost:5011/casestatus`)
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
    <>
      <Typography variant="h3">สถานะการซ่อม</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ลำดับ</TableCell>
              <TableCell>ชื่องาน</TableCell>
              <TableCell>รายละเอียดผู้แจ้ง</TableCell>
              <TableCell>สถานะ</TableCell>
              <TableCell>วันที่แจ้ง</TableCell>
              <TableCell>รายละเอียด</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {caseData.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {item.case_title}
                </TableCell>

                <TableCell>{item.name}</TableCell>
                <TableCell>{item.status_name}</TableCell>
                <TableCell>
                  {new Date(item.created_date).toLocaleString("th-TH", {
                    dateStyle: "long",
                    timeStyle: "medium",
                  })}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => topagedetail(item.case_id)}
                    variant="contained"
                    color="success"
                  >
                    รายละเอียด
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default Statuscase;
