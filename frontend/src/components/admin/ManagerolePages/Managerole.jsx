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

function Managerole() {
  const [roleData, setroledata] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;
  const Deleterole = async (role_id) => {
    const shouldDelete = window.confirm("คุณต้องการลบอุปกรณ์นี้หรือไม่?");
    if (!shouldDelete) {
      return;
    }

    axios
      .delete(`${apiUrl}/roles/${role_id}`)
      .then((response) => {
        console.log(response.data);
        axios
          .get(`${apiUrl}/roles`)
          .then((response) => {
            setroledata(response.data);
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
      .get(`${apiUrl}/roles`)
      .then(function (response) {
        setroledata(response.data);
        console.log(roleData);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);

  return (
    <div>
      <h1>
        จัดการตำแหน่ง {"\u00A0"}
        <Link to="/admin/Addrole">
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
              <TableCell>ตำแหน่ง</TableCell>
              <TableCell>แก้ไข / ลบ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roleData.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* <TableCell component="th" scope="row">
                  {item.dev_id}
                </TableCell> */}
                <TableCell>{item.role_id} </TableCell>

                <TableCell>{item.role_name}</TableCell>
                <TableCell>
                  <Link
                    to={`/admin/Editrole/${item.role_id}/${item.role_name}`}
                  >
                    <Button
                      variant="contained"
                      sx={{ fontSize: "12px", backgroundColor: "#FF9933" }}
                    >
                      แก้ไข
                    </Button>
                  </Link>

                  <Button
                    onClick={() => Deleterole(item.role_id)}
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
export default Managerole;
