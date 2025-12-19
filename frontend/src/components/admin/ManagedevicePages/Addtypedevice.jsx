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
const Addtypedevice = () => {
  const [typeDevice, setTypeDevice] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const [inputNewType, setInputNewType] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleOpenDialog = (item) => {
    setSelectItem(item);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
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
  useEffect(() => {
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
    fetchtypedevice();
  }, []);
  console.log(typeDevice);
  return (
    <>
      <Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h3">จัดการประเภทอุปกรณ์</Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: 50, height: 30, mt: 2, ml: 3 }}
          >
            Add+
          </Button>
        </Box>
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
                        onClick={() => handleOpenDialog(items.devicetype_name)}
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
