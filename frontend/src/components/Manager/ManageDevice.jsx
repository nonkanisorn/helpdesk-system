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
  Chip,
  TextareaAutosize,
  Grid,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ManageDevice = () => {
  const [device, setDevice] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectItem, setSelectItem] = useState();
  const [inputUpdateDevice, setInputUpdateDevice] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [typeDevice, setTypeDevice] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [inputNewDeviceName, setInputNewDeviceName] = useState("");
  const [inputNewDeviceDetail, setInputNewDeviceDetail] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;
  const tesnum = 1;
  const [selectTypeDevice, setSelectTypeDevice] = useState("");
  console.log(typeof selectTypeDevice);
  const handleSelectTypeDevice = (event) => {
    setSelectTypeDevice(event.target.value);
  };
  const handleOpenAddDevice = () => {
    setSelectTypeDevice("");
    setOpenAddDialog(true);
  };
  const handleCloseAddDevice = () => {
    setOpenAddDialog(false);
  };
  const handleSubmitAddDevice = () => {
    axios
      .post(`${apiUrl}/device`, {
        dev_name: inputNewDeviceName,
        dev_type: selectTypeDevice,
        dev_detail: inputNewDeviceDetail,
      })
      .catch((error) => {
        if (error) {
          console.log(error);
        }
      });
    handleCloseAddDevice();
    setRefresh((prev) => !prev);
  };
  const handleDeleteDevice = (dev_id) => {
    axios
      .delete(`${apiUrl}/device/${dev_id}`)
      .then((response) => {
        console.log(response);
        setRefresh((prev) => !prev);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleOpenDialog = (item) => {
    setSelectItem(item);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleSubmit = (dev_id) => {
    console.log(dev_id);
    axios
      .put(`${apiUrl}/device/${dev_id}`, {
        newdevicename: inputUpdateDevice,
      })
      .then((response) => {
        console.log(response);
        setRefresh((prev) => !prev);
      })
      .catch((error) => {
        console.log(error);
      });
    handleCloseDialog();
  };
  useEffect(() => {
    const fetchTypeDevice = () => {
      axios.get(`${apiUrl}/device/type`).then((response) => {
        console.log(response.data);
        setTypeDevice(response.data);
      });
    };
    fetchTypeDevice();
  }, []);
  useEffect(() => {
    const fetchdevice = () => {
      axios
        .get(`${apiUrl}/device`)
        .then((response) => {
          setDevice(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchdevice();
  }, [refresh]);
  console.log(device);
  return (
    <>
      <Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h3">จัดการอุปกรณ์</Typography>
          <Button
            onClick={() => handleOpenAddDevice()}
            variant="contained"
            color="primary"
            sx={{ width: 50, height: 30, mt: 2, ml: 3 }}
          >
            Add+
          </Button>
        </Box>
        <Dialog
          open={openAddDialog}
          onClose={() => handleCloseAddDevice()}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>ADD</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* ฝั่งซ้าย */}
                <Grid item xs={4}>
                  <TextField
                    name="deviceName"
                    label="ชื่ออุปกรณ์"
                    fullWidth
                    sx={{ mb: 2, mt: 1 }}
                    onChange={(e) => setInputNewDeviceName(e.target.value)}
                  />
                  <TextField
                    select
                    fullWidth
                    value={selectTypeDevice}
                    label="ประเภทอุปกรณ์"
                    onChange={handleSelectTypeDevice}
                  >
                    {typeDevice.map((items) => (
                      <MenuItem value={items.devicetype_id}>
                        {items.devicetype_name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* ฝั่งขวา */}
                <Grid item xs={8}>
                  <TextareaAutosize
                    name="deviceDetail"
                    minRows={10}
                    placeholder="รายละเอียดอุปกรณ์"
                    style={{ width: "100%", fontSize: "1rem", padding: "8px" }}
                    onChange={(e) => setInputNewDeviceDetail(e.target.value)}
                  />
                </Grid>
              </Grid>

              <DialogActions>
                <Button onClick={() => handleCloseAddDevice()}>ยกเลิก</Button>
                <Button
                  onClick={() => handleSubmitAddDevice()}
                  // otype="submit"
                  variant="contained"
                >
                  ยืนยัน
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table sx={{ m: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>ลำดับ</TableCell>
                <TableCell>ชื่ออุปกรณ์</TableCell>
                <TableCell>ประเภทอุปกรณ์</TableCell>
                <TableCell align="center">จำนวน</TableCell>
                <TableCell align="center">จัดการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {device.map((items, idx) => (
                <TableRow>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{items.dev_name}</TableCell>

                  <TableCell>
                    <Chip label={items.devicetype_name}></Chip>
                  </TableCell>

                  <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                    <Chip
                      variant="outlined"
                      color="info"
                      label={items.numberofinstancedevice}
                      sx={{ width: 50 }}
                    ></Chip>
                  </TableCell>

                  <TableCell align="center">
                    <Link>
                      <Button
                        variant="contained"
                        sx={{ fontSize: "12px", backgroundColor: "#FF9933" }}
                        onClick={() => handleOpenDialog(items.dev_name)}
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
                                  setInputUpdateDevice(e.target.value)
                                }
                              ></TextField>
                            </form>
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={() => handleSubmit(items.dev_id)}
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
                      onClick={() =>
                        confirm("ยืนยันการลบ")
                          ? handleDeleteDevice(items.dev_id)
                          : null
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
                    <Link
                      to={`/manager/manage/device/${items.dev_id}/instances`}
                      state={{ device_name: items.dev_name }}
                    >
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ ml: 2 }}
                      >
                        รายการอุปกรณ์
                      </Button>
                    </Link>
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

export default ManageDevice;
