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
import AddStatusDialog from "../dialog/AddDialog/AddStatusDialog";

function Managestatus() {
  const [statusData, setStatusdata] = useState([]);

  const [openAddStatusDialog, setOpenStatusDialog] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleOpenAddStatusDialog = () => {
    setOpenStatusDialog(true);
  };
  const handleCloseAddStatusDialog = () => {
    setOpenStatusDialog(false);
  };
  const Deletestatus = async (status_id) => {
    const shouldDelete = window.confirm("คุณต้องการลบอุปกรณ์นี้หรือไม่?");
    if (!shouldDelete) {
      return;
    }

    axios
      .delete(`${apiUrl}/status/${status_id}`)
      .then((response) => {
        console.log(response.data);
        axios
          .get(`${apiUrl}/status`)
          .then((response) => {
            setStatusdata(response.data);
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

  const fetctStatus = () => {
    axios
      .get(`${apiUrl}/status`)
      .then(function (response) {
        setStatusdata(response.data);
        console.log(statusData);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  };
  useEffect(() => {
    axios
      .get(`${apiUrl}/status`)
      .then(function (response) {
        setStatusdata(response.data);
        console.log(statusData);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);

  return (
    <div>
      <h1>
        จัดการสถานะ {"\u00A0"}
        <Button
          variant="contained"
          size="small"
          onClick={handleOpenAddStatusDialog}
        >
          +ADD
        </Button>
        <AddStatusDialog
          open={openAddStatusDialog}
          onClose={handleCloseAddStatusDialog}
          onSuccess={fetctStatus}
        />
      </h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>สถานะ</TableCell>
              <TableCell>แก้ไข / ลบ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statusData.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* <TableCell component="th" scope="row">
                  {item.dev_id}
                </TableCell> */}
                <TableCell>{item.status_id} </TableCell>

                <TableCell>{item.status_name}</TableCell>
                <TableCell>
                  <Link
                    to={`/admin/Editstatus/${item.status_id}/${item.status_name}`}
                  >
                    <Button
                      variant="contained"
                      sx={{ fontSize: "12px", backgroundColor: "#FF9933" }}
                    >
                      แก้ไข
                    </Button>
                  </Link>

                  <Button
                    onClick={() => Deletestatus(item.status_id)}
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
export default Managestatus;
