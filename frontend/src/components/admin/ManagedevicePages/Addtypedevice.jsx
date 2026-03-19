import {
  Box,
  TableContainer,
  TableHead,
  Typography,
  Table,
  TableRow,
  Paper,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AddDeviceTypeDialog from "../dialog/AddDialog/AddDeviceTypeDialog";
import EditDeviceTypeDialog from "../dialog/EditDialog/EditDeviceTypeDialog";
const Addtypedevice = () => {
  const [typeDevice, setTypeDevice] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const [openAddDeviceType, setOpenAddDeviceType] = useState(false);
  const [openEditDeviceTypeDialog, setOpenEditDeviceTypeDialog] =
    useState(false);

  const [selectedDeviceTypeID, setSelectedDeviceTypeID] = useState(null);
  const [inputNewType, setInputNewType] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const deleteTypeDevice = (devicetype_id) => {
    try {
      const shouldDelete = window.confirm(
        "คุณต้องการลบปรเภทอุปกรณ์นี้หรือไม่?",
      );
      if (!shouldDelete) {
        return;
      }
      axios.delete(`${apiUrl}/device/type/${devicetype_id}`).then(() => {
        fetchtypedevice();
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenAddDeviceType = () => {
    setOpenAddDeviceType(true);
  };
  const handleCloseAddDeviceType = () => {
    setOpenAddDeviceType(false);
  };
  const handleOpenEditDeviceTypeDialog = (id) => {
    setSelectedDeviceTypeID(id);
    setOpenEditDeviceTypeDialog(true);
  };
  const handleCloseEditDeviceTypeDialog = () => {
    setOpenEditDeviceTypeDialog(false);
  };

  const handleSubmit = (devicetype_id) => {
    axios
      .patch(`${apiUrl}/device/type/${devicetype_id}`, {
        devicetype_name: inputNewType,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    handleCloseDialog();
  };
  console.log(inputNewType);
  const fetchtypedevice = () => {
    axios
      .get(`${apiUrl}/device/type`)
      .then((response) => {
        setTypeDevice(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchtypedevice();
  }, []);
  console.log("okgkk");
  return (
    // TODO: แก้ไขประเภทอุปกรณ์ pass
    //  TODO: สร้างหน้า ประเภทปัญหา  pass
    //  TODO: update ui profile pass
    <>
      <EditDeviceTypeDialog
        open={openEditDeviceTypeDialog}
        onClose={handleCloseEditDeviceTypeDialog}
        onSuccess={fetchtypedevice}
        id={selectedDeviceTypeID}
      />
      <Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h3">จัดการประเภทอุปกรณ์</Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: 50, height: 30, mt: 2, ml: 3 }}
            onClick={handleOpenAddDeviceType}
          >
            Add+
          </Button>
        </Box>
        <AddDeviceTypeDialog
          open={openAddDeviceType}
          onClose={handleCloseAddDeviceType}
          onSuccess={fetchtypedevice}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ลำดับ</TableCell>
                <TableCell>ประเภท</TableCell>
                <TableCell>แก้ไข/ลบ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {typeDevice.map((items, idx) => (
                <TableRow>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{items.devicetype_name}</TableCell>
                  <TableCell>
                    <Link>
                      <Button
                        variant="contained"
                        sx={{ fontSize: "12px", backgroundColor: "#FF9933" }}
                        onClick={() =>
                          handleOpenEditDeviceTypeDialog(items.devicetype_id)
                        }
                      >
                        แก้ไข
                      </Button>
                      <Dialog open={openDialog}>
                        <DialogTitle>แก้ไข</DialogTitle>
                        <DialogTitle>ชื่อเดิม {selectItem}</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            <form onSubmit={handleSubmit} id="updatetype-form">
                              <TextField
                                label="ชื่อใหม่"
                                sx={{ mt: 2 }}
                                onChange={(e) =>
                                  setInputNewType(e.target.value)
                                }
                              ></TextField>
                            </form>
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={() => handleSubmit(items.devicetype_id)}
                            autoFocus
                            variant="contained"
                            color="success"
                            type="submit"
                            form="updatetype-form"
                          >
                            ยืนยัน
                          </Button>
                          <Button
                            onClick={() => handleCloseDialog()}
                            variant="contained"
                            color="error"
                          >
                            ยกเลิก
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Link>

                    <Button
                      variant="contained"
                      sx={{
                        fontSize: "12px",
                        backgroundColor: "red",
                        marginLeft: 3,
                      }}
                      onClick={() => deleteTypeDevice(items.devicetype_id)}
                    >
                      ลบ
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Addtypedevice;
