import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Input,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

import { Link } from "react-router-dom";
import { Stack } from "@mui/system";

function Manageuser() {
  const defaultValues = {
    // ช่องข้อความ
    username: "",
    userpassword: "",
    name: "",
    user_email: "",
    user_phone: "",
    // ช่อง select (number)
    role_id: null, // 👈 number | null
    dep_id: null, // 👈 number | null
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    control,
  } = useForm({ defaultValues });
  const [userData, setUserData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [depData, setDepData] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const handleOpenAddUserDialog = () => setOpenAddUserDialog(true);
  const handleCloseAddUserDialog = () => setOpenAddUserDialog(false);
  const confirmDelete = async (dep_id) => {
    const shouldDelete = window.confirm("คุณต้องการลบอุปกรณ์นี้หรือไม่?");
    if (!shouldDelete) {
      return;
    }
  };
  const handleDelete = (user_id) => {
    axios.delete(`${apiUrl}/users/${user_id}`).then(() => {
      console.log("ลบสําเร็จ");
      setrefresh((prev) => !prev);
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUserData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [refresh]);
  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        await axios.get(`${apiUrl}/roles`).then((res) => {
          console.log("res", res);
          setRoleData(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    const fetchDepData = async () => {
      try {
        await axios.get(`${apiUrl}/departments`).then((res) => {
          setDepData(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchDepData();
    fetchRoleData();
  }, []);
  if (!userData || userData.length === 0) {
    return null; // หรือแสดงข้อความแจ้งเตือนอื่นๆ
  }
  console.log(userData);
  const onSubmit = async (data) => {
    await axios
      .post(`${apiUrl}/register`, {
        username: data.username,
        userpassword: data.userpassword,
        role_id: data.role_id,
        name: data.name,
        dep_id: data.dep_id,
        user_email: data.user_email,
        user_phone: data.user_phone,
      })
      .then((res) => {
        reset(defaultValues);
      });
    console.log(watch(data));
  };

  console.log("rdata", roleData);
  return (
    <>
      <Dialog
        open={openAddUserDialog}
        onClose={handleCloseAddUserDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">เพิ่มผู้ใช้</Typography>
            <Button onClick={handleCloseAddUserDialog}>
              <Typography color="black">x</Typography>
            </Button>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ overflowY: "auto" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1}>
              <Typography>ชื่อผู้ใช้</Typography>
              <TextField {...register("username")}></TextField>
              <Typography>รหัสผ่าน</Typography>
              <TextField {...register("userpassword")}></TextField>
              <Typography>ชื่อ-นามสกุล</Typography>
              <TextField {...register("name")}></TextField>
              <Typography>อีเมล์</Typography>
              <TextField {...register("user_email")}></TextField>
              <Typography>เบอร์โทรศัพท์</Typography>
              <TextField {...register("user_phone")}></TextField>
              <Typography>บทบาท</Typography>
              <Controller
                control={control}
                name="role_id"
                render={({ field }) => (
                  <Select defaultValue={null} {...field}>
                    {roleData.map((items, index) => (
                      <MenuItem value={items.role_id}>
                        {items.role_name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              ></Controller>
              <Typography>แผนก</Typography>
              <Controller
                control={control}
                name="dep_id"
                render={({ field }) => (
                  <Select defaultValue={" "} {...field}>
                    {depData.map((items, index) => (
                      <MenuItem value={items.dep_id}>{items.dep_name}</MenuItem>
                    ))}
                  </Select>
                )}
              ></Controller>
              <Button variant="contained" type="submit">
                เพิ่ม
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
      <Box sx={{ overflowX: "scroll" }}>
        <h1>
          จัดการผู้ใช้ {"\u00A0"}
          {/* <Link to="/admin/adduser"> */}
          <Button
            variant="contained"
            size="small"
            onClick={() => setOpenAddUserDialog(true)}
          >
            +ADD
          </Button>
          {/* </Link> */}
        </h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>ชื่อ</TableCell>
                <TableCell>บทบาท</TableCell>
                <TableCell>แก้ไข / ลบ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{item.users_id} </TableCell>

                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.role_name}</TableCell>
                  <TableCell>
                    <Link to={`/admin/edituser/${item.users_id}`}>
                      <Button
                        variant="contained"
                        sx={{ fontSize: "12px", backgroundColor: "#FF9933" }}
                      >
                        แก้ไข
                      </Button>
                    </Link>

                    <Button
                      onClick={() => {
                        handleDelete(item.users_id);
                      }}
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
}
export default Manageuser;
