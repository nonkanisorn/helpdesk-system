import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

import { Link } from "react-router-dom";

function Managedepartment() {
  const [departmentData, setDepartmentdata] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const Deletedepartment = async (dep_id) => {
    const shouldDelete = window.confirm("คุณต้องการลบอุปกรณ์นี้หรือไม่?");
    if (!shouldDelete) {
      return;
    }

    axios
      .delete(`${apiUrl}/departments/${dep_id}`)
      .then((response) => {
        console.log(response.data);
        axios
          .get(`${apiUrl}/departments`)
          .then((response) => {
            setDepartmentdata(response.data);
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error("Error deeteing data: ", error``);
      });
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/departments`)
      .then(function (response) {
        setDepartmentdata(response.data);
        console.log(departmentData);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);

  return (
    <div>
      <h1>
        จัดการแผนก {"\u00A0"}
        <Link to="/admin/Adddepartment">
          <Button variant="contained" size="small">
            +ADD
          </Button>
        </Link>
      </h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>แผนก</TableCell>
              <TableCell>แก้ไข / ลบ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departmentData.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* <TableCell component="th" scope="row">
                  {item.dev_id}
                </TableCell> */}
                <TableCell>{item.dep_id} </TableCell>

                <TableCell>{item.dep_name}</TableCell>
                <TableCell>
                  <Link
                    to={`/admin/Editdepartment/${item.dep_id}/${item.dep_name}`}
                  >
                    <Button
                      variant="contained"
                      sx={{ fontSize: "12px", backgroundColor: "#FF9933" }}
                    >
                      แก้ไข
                    </Button>
                  </Link>

                  <Button
                    onClick={() => Deletedepartment(item.dep_id)}
                    variant="contained"
                    sx={{
                      fontSize: "12px",
                      backgroundColor: "red",
                      marginLeft: 3,
                    }}
                  >
                    ลบ
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default Managedepartment;
