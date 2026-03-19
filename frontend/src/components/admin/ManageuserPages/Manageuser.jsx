import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Switch, Box } from "@mui/material";
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
import EditUserDialog from "../dialog/EditDialog/EditUserDialog";

function Manageuser() {
  const defaultValues = {
    // ช่องข้อความ
    username: "",
    userpassword: "",
    confirmPassword: "",
    full_name: "",
    email: "",
    phone: "",
    // ช่อง select (number)
    role_id: null, // 👈 number | null
    department_id: null, // 👈 number | null
    is_active: 1,
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    control,
  } = useForm({ defaultValues, mode: "onChange" });
  const password = watch("userpassword");
  console.log("passsss", password);
  const [userData, setUserData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [depData, setDepData] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [openEditUserDialog, setOpenEditUserDialog] = useState(false);
  const [selectedUserID, setSelectedUserID] = useState(null);
  const handleOpenAddUserDialog = () => setOpenAddUserDialog(true);
  const handleCloseAddUserDialog = () => setOpenAddUserDialog(false);
  const handleCloseEditUserDialog = () => setOpenEditUserDialog(false);

  console.log(watch("is_active"));
  const handleStatusActiveUsers = async (users_id, checked) => {
    const newStatus = checked ? 1 : 0; // ✅ boolean -> 0/1

    // ✅ อัปเดต UI ทันที
    setUserData((prev) =>
      prev.map((u) =>
        u.users_id === users_id ? { ...u, is_active: newStatus } : u,
      ),
    );

    try {
      await axios.patch(`${apiUrl}/users/isactive/${users_id}`, {
        is_active: newStatus, // ✅ ส่ง 0/1
      });
    } catch (error) {
      console.log(error);

      // rollback ถ้า error
      setUserData((prev) =>
        prev.map((u) =>
          u.users_id === users_id
            ? { ...u, is_active: newStatus === 1 ? 0 : 1 }
            : u,
        ),
      );
    }
  };

  const handleDelete = (user_id) => {
    axios.delete(`${apiUrl}/users/${user_id}`).then(() => {
      console.log("ลบสําเร็จ");
      setrefresh((prev) => !prev);
    });
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/users`);
      setUserData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
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
  console.log("dasdsa1`", userData);
  const onSubmit = async (data) => {
    console.log("is_active:", data.is_active, typeof data.is_active);
    await axios
      .post(`${apiUrl}/register`, {
        username: data.username,
        userpassword: data.userpassword,
        role_id: data.role_id,
        full_name: data.full_name,
        department_id: data.department_id,
        email: data.email,
        phone: data.phone,
        is_active: data.is_active,
      })
      .then((res) => {
        reset(defaultValues);
      });
    console.log(watch(data));
  };

  console.log("rdata", roleData);
  return (
    // TODO: แก้ไขข้อมูลผู้ใช้ pass
    <>
      <EditUserDialog
        open={openEditUserDialog}
        onClose={handleCloseEditUserDialog}
        onSuccess={fetchData}
        id={selectedUserID}
        roleData={roleData}
        depData={depData}
      />
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
              <TextField
                type="password"
                {...register("userpassword")}
              ></TextField>
              <Typography>ยืนยันรหัสผ่าน</Typography>
              <TextField
                type="password"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password || "รหัสผ่านไม่ตรงกัน",
                })}
              ></TextField>
              {errors.confirmPassword && (
                <Typography>{errors.confirmPassword.message}</Typography>
              )}
              <Typography>ชื่อ-นามสกุล</Typography>
              <TextField {...register("full_name")}></TextField>
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
                name="department_id"
                render={({ field }) => (
                  <Select defaultValue={" "} {...field}>
                    {depData.map((items, index) => (
                      <MenuItem value={items.dep_id}>{items.dep_name}</MenuItem>
                    ))}
                  </Select>
                )}
              ></Controller>
              <Typography>สถานะผู้ใช้งาน</Typography>
              <Controller
                control={control}
                name="is_active"
                defaultValue={1}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value ?? 1}
                    onChange={(e) => field.onChange(Number(e.target.value))} // ✅ cast เป็น number
                  >
                    <MenuItem value={0}>ไม่พร้อมใช้งาน</MenuItem>
                    <MenuItem value={1}>พร้อมใช้งาน</MenuItem>
                  </Select>
                )}
              />

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
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 750, overflowY: "auto" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>ชื่อ</TableCell>
                <TableCell>บทบาท</TableCell>
                <TableCell>สถานะ</TableCell>
                <TableCell>แก้ไข / ลบ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{item.user_id} </TableCell>

                  <TableCell>{item.full_name}</TableCell>
                  <TableCell>{item.role_name}</TableCell>
                  <TableCell>
                    <Switch
                      checked={item.is_active === 1}
                      onChange={(e) =>
                        handleStatusActiveUsers(item.user_id, e.target.checked)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ fontSize: "12px", backgroundColor: "#FF9933" }}
                      onClick={() => {
                        setSelectedUserID(item.user_id);
                        setOpenEditUserDialog(true);
                      }}
                    >
                      แก้ไข
                    </Button>

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
