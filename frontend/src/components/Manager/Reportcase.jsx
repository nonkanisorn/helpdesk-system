import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
// import Detailticket from "./Detailcase";
import { Typography } from "@mui/material";

function Reportcase() {
  const [nametech, setNametech] = useState([]);
  const [selectedTechnicians, setSelectedTechnicians] = useState({});
  const [ticketData, setticketData] = useState([]);
  const navigate = useNavigate();
  const departmentMap = {
    1: "ไอที",
    2: "บัญชี",
  };
  const handleChange = (event, ticket_id) => {
    const selectedTechnician = event.target.value;
    setSelectedTechnicians((prevState) => ({
      ...prevState,
      [ticket_id]: selectedTechnician,
    }));
  };
  const sendtech = (ticket_id) => {
    const technician_name = selectedTechnicians[ticket_id];
    axios
      .patch(`http://localhost:5011/addtechticket/${ticket_id}`, {
        technician_name,
      })
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const topagedetail = (ticket_id) => {
    // navigate(`/manager/detail/${ticket_id}`, {
    //   state: { ticketData: ticketData },
    // });
    navigate(`/manager/detail/${ticket_id}`, {
      state: { ticketData: ticketData },
    });
  };
  useEffect(() => {
    axios
      .get("http://localhost:5011/ticket/status/open")
      .then(function (response) {
        setticketData(response.data);
        console.log(ticketData);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);
  console.log("dsadas", ticketData);
  const managerStatusMap = {
    1: "รอมอบหมาย",
    2: "มอบหมายแล้ว",
    3: "อยู่ระหว่างดำเนินการ",
    4: "ช่างดำเนินการเสร็จแล้ว",
    5: "รอการยืนยันจากผู้ใช้",
    6: "ปิดเคสแล้ว",
    7: "ชะลอ – รออะไหล่",
  };
  return (
    //
    <>
      <Typography sx={{ marginY: 2 }} variant="h3">
        รายการแจ้งซ่อม
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ลำดับ </TableCell>
              <TableCell>ชื่องาน</TableCell>
              <TableCell>สถานะ</TableCell>
              <TableCell>วันที่แจ้ง</TableCell>
              <TableCell>มอบหมายงาน</TableCell>
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
                <TableCell>รอมอบหมายงาน</TableCell>
                <TableCell>
                  {new Date(item.created_at).toLocaleString("th-TH", {
                    dateStyle: "long",
                    timeStyle: "medium",
                  })}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => topagedetail(item.ticket_id)}
                    variant="contained"
                    color="success"
                  >
                    มอบหมายช่าง
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

export default Reportcase;
