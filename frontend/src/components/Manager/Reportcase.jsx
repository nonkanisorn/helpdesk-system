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
import Detailcase from "./Detailcase";
import { Typography } from "@mui/material";

function Reportcase() {
  const [nametech, setNametech] = useState([]);
  const [selectedTechnicians, setSelectedTechnicians] = useState({});
  const [caseData, setcaseData] = useState([]);
  const navigate = useNavigate();
  const departmentMap = {
    1: "ไอที",
    2: "บัญชี",
  };
  const handleChange = (event, case_id) => {
    const selectedTechnician = event.target.value;
    setSelectedTechnicians((prevState) => ({
      ...prevState,
      [case_id]: selectedTechnician,
    }));
  };
  const sendtech = (case_id) => {
    const technician_name = selectedTechnicians[case_id];
    axios
      .patch(`http://localhost:5011/addtechcase/${case_id}`, {
        technician_name,
      })
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const topagedetail = (case_id) => {
    navigate(`/manager/detail/${case_id}`, { state: { caseData: caseData } });
  };
  useEffect(() => {
    axios
      .get("http://localhost:5011/case/")
      .then(function (response) {
        setcaseData(response.data);
        console.log(caseData);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);
  console.log("dsadas", caseData);
  return (
    // TODO: แก้ไข เพิ่มปุ่ม เพิ่มเติม ย้าย รายละเอียดงาน ไปไว้อีกหน้า
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
              <TableCell>รายละเอียดผู้แจ้ง</TableCell>
              <TableCell>แผนกผู้แจ้ง</TableCell>
              <TableCell>รายละเอียดงาน</TableCell>
              <TableCell>สถานะ</TableCell>
              <TableCell>วันที่แจ้ง</TableCell>
              <TableCell>เลือกช่าง</TableCell>
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
                <TableCell>{item.name}</TableCell>
                <TableCell>{departmentMap[item.dep_id]}</TableCell>
                <TableCell>{item.case_detail}</TableCell>
                <TableCell>
                  {item.status_id === 1
                    ? "รอดำเนินการ"
                    : item.status_id === 2
                      ? "กำลังดำเนินการ"
                      : item.status_id === 3
                        ? "เสร็จสิ้น"
                        : item.status_id === 4
                          ? "รอการยืนยัน"
                          : null}
                </TableCell>
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
                    เลือกช่าง
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
