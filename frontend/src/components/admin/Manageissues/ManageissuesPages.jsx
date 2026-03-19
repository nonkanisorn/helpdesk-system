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
import AddIssuesCategoriesDialog from "../dialog/AddDialog/AddIssuesCategoriesDialog";
import EditIssuesCategoriesDialog from "../dialog/EditDialog/EditIssuesCategories";

function ManageissuesPages() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [issuesCategoriesData, setIssuesCategoriesData] = useState([]);

  const [openAddIssuesCategoriesDialog, setOpenAddIssuesCategoriesDialog] =
    useState(false);
  const [openEditIssuesCategoriesDialog, setOpenEditIssuesCategoriesDialog] =
    useState(false);

  const [selectedIssuesCategoriesID, setSelectedIssuesCategoriesID] =
    useState(null);

  const handleOpenAddStatusDialog = () => {
    setOpenAddIssuesCategoriesDialog(true);
  };
  const handleCloseAddStatusDialog = () => {
    setOpenAddIssuesCategoriesDialog(false);
  };
  const handleOpenEditIssuesCategoriesDialog = (id) => {
    setSelectedIssuesCategoriesID(id);
    setOpenEditIssuesCategoriesDialog(true);
  };
  const handleCloseEditIssuesCategoriesDialog = () => {
    setOpenEditIssuesCategoriesDialog(false);
  };
  const deleteIssuesCategories = async (issues_categories_id) => {
    const shouldDelete = window.confirm("คุณต้องการลบอุปกรณ์นี้หรือไม่?");
    if (!shouldDelete) {
      return;
    }

    axios
      .delete(`${apiUrl}/issues-categories/${issues_categories_id}`)
      .then((response) => {
        console.log(response.data);
        axios
          .get(`${apiUrl}/issues-categories`)
          .then((response) => {
            setIssuesCategoriesData(response.data);
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

  const fetchIssuesCategories = () => {
    axios
      .get(`${apiUrl}/issues-categories`)
      .then(function (response) {
        setIssuesCategoriesData(response.data);
        console.log(statusData);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  };
  useEffect(() => {
    axios
      .get(`${apiUrl}/issues-categories`)
      .then(function (response) {
        setIssuesCategoriesData(response.data);
        console.log(statusData);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);

  return (
    <div>
      <EditIssuesCategoriesDialog
        open={openEditIssuesCategoriesDialog}
        onClose={handleCloseEditIssuesCategoriesDialog}
        onSuccess={fetchIssuesCategories}
        id={selectedIssuesCategoriesID}
      />

      <h1>
        จัดการประเภทของปัญหา {"\u00A0"}
        <Button
          variant="contained"
          size="small"
          onClick={handleOpenAddStatusDialog}
        >
          +ADD
        </Button>
        <AddIssuesCategoriesDialog
          open={openAddIssuesCategoriesDialog}
          onClose={handleCloseAddStatusDialog}
          onSuccess={fetchIssuesCategories}
        />
      </h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ลำดับ</TableCell>
              <TableCell>ประเภท</TableCell>
              <TableCell>จัดการ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issuesCategoriesData.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* <TableCell component="th" scope="row">
                  {item.dev_id}
                </TableCell> */}
                <TableCell>{item.issues_categories_id} </TableCell>

                <TableCell>{item.issues_categories_name}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{ fontSize: "12px", backgroundColor: "#FF9933" }}
                    onClick={() =>
                      handleOpenEditIssuesCategoriesDialog(
                        item.issues_categories_id,
                      )
                    }
                  >
                    แก้ไข
                  </Button>

                  <Button
                    onClick={() =>
                      deleteIssuesCategories(item.issues_categories_id)
                    }
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
export default ManageissuesPages;
