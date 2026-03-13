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
import { useSelector } from "react-redux";

function Manageuser() {
  const defaultValues = {
    // ช่องข้อความ
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
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
  const token = useSelector((state) => state.user.token);
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
    axios
      .delete(`${apiUrl}/users/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        
        setrefresh((prev) => !prev);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users/view`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data.result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [refresh]);
  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        await axios
          .get(`${apiUrl}/roles`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {

            setRoleData(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoleData();
  }, []);
  // if (!depData || depData.length === 0) {
  //   return <div>Loading...</div>;
  // }
  useEffect(() => {
    // console.log("effect token", token);
    const fetchDepData = async () => {
      try {
        await axios
          .get(`${apiUrl}/departments`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setDepData(res.data.result);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchDepData();
  }, []);
  if (!userData || userData.length === 0) {
    return null; // หรือแสดงข้อความแจ้งเตือนอื่นๆ
  }

  const onSubmit = async (data) => {
    await axios
      .post(`${apiUrl}/register`, {
        username: data.username,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        role_id: data.role_id,
        department_id: data.dep_id,
        is_active: 1,
      })
      .then((res) => {
        reset(defaultValues);
      });

  };


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
              <TextField {...register("password")}></TextField>
              <Typography>ชื่อ</Typography>
              <TextField {...register("first_name")}></TextField>
              <Typography>นามสกุล</Typography>
              <TextField {...register("last_name")}></TextField>
              <Typography>อีเมล์</Typography>
              <TextField {...register("email")}></TextField>
              <Typography>เบอร์โทรศัพท์</Typography>
              <TextField {...register("phone")}></TextField>
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
              {userData &&
                userData.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{item.user_id} </TableCell>

                    <TableCell>{item.first_name}</TableCell>
                    <TableCell>{item.role_name}</TableCell>
                    <TableCell>
                      <Link to={`/admin/edituser/${item.user_id}`}>
                        <Button
                          variant="contained"
                          sx={{ fontSize: "12px", backgroundColor: "#FF9933" }}
                        >
                          แก้ไข
                        </Button>
                      </Link>

                      <Button
                        onClick={() => {
                          handleDelete(item.user_id);
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
