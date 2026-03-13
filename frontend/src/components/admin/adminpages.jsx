// import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Paper,
  Box,
  Typography,
  Grid,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Input,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { blue, yellow, deepOrange } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import FlagIcon from "@mui/icons-material/Flag";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import DashboardadminCard from "./DashboardadminCard";
import AdminQuickActionCard from "./AdminQuickActionCard";
import AddRoleDialog from "./dialog/AddDialog/AddRoleDialog";
import AddStatusDialog from "./dialog/AddDialog/AddStatusDialog";
import AddDepartmentDialog from "./dialog/AddDialog/AddDepartmentDialog";
function Adminpages() {
  const [role, setRole] = useState([]);
  const [user, setUser] = useState([]);
  const [device, setDevice] = useState([]);
  const [status, setStatus] = useState([]);
  const [department, setDepartment] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;
  const handleCloseAddUserDialog = () => setOpenAddUserDialog(false);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [openAddRoleDialog, setOpenRoleDialog] = useState(false);
  const [openAddStatusDialog, setOpenStatusDialog] = useState(false);
  const [openAddDepartmentDialog, setOpenDepartmentDialog] = useState(false);
  const handleAddRoleDialog = () => {
    setOpenRoleDialog(true);
  };
  const handleCloseAddRoleDialog = () => {
    setOpenRoleDialog(false);
  };
  const handleAddStatusDialog = () => {
    setOpenStatusDialog(true);
  };
  const handleCloseAddStatusDialog = () => {
    setOpenStatusDialog(false);
  };
  const handleAddDepartmentDialog = () => {
    setOpenDepartmentDialog(true);
  };
  const handleCloseDepartmentDialog = () => {
    setOpenDepartmentDialog(false);
  };
  //react-hook-form
  const defaultValues = {
    // ช่องข้อความ
    username: "",
    userpassword: "",
    name: "",
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
  } = useForm({ defaultValues });
  const onSubmit = async (data) => {
    console.log("is_active:", data.is_active, typeof data.is_active);
    await axios
      .post(`${apiUrl}/register`, {
        username: data.username,
        userpassword: data.userpassword,
        role_id: data.role_id,
        full_name: data.name,
        dep_id: data.dep_id,
        email: data.email,
        phone: data.phone,
        is_active: data.is_active,
      })
      .then((res) => {
        reset(defaultValues);
      });
    console.log(watch(data));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchRoleData = await axios.get(`http://localhost:5011/roles`);
        setRole(fetchRoleData.data);

        const fetchUserData = await axios.get(`http://localhost:5011/users`);
        setUser(fetchUserData.data.length);

        const fetchDeviceData = await axios.get(`http://localhost:5011/device`);
        setDevice(fetchDeviceData.data.length);

        const fetchStatusData = await axios.get(`http://localhost:5011/status`);
        setStatus(fetchStatusData.data.length);

        const fetchDepartmentData = await axios.get(
          `http://localhost:5011/departments`,
        );
        setDepartment(fetchDepartmentData.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
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
              <TextField {...register("email")}></TextField>
              <Typography>เบอร์โทรศัพท์</Typography>
              <TextField {...register("phone")}></TextField>
              <Typography>บทบาท</Typography>
              <Controller
                control={control}
                name="role_id"
                render={({ field }) => (
                  <Select defaultValue={null} {...field}>
                    {role.map((items, index) => (
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
                    {department.map((items, index) => (
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

      <Typography variant="h4" fontWeight="fontWeightBold">
        Admin Dashboard
      </Typography>
      <Typography color="grey" sx={{ mb: 3 }}>
        ภาพรวมระบบและการจัดการทั้งหมด
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={1} md={3}>
          <DashboardadminCard
            title="สมาชิก"
            data={user}
            icon={<PersonIcon />}
          />
        </Grid>
        <Grid item xs={1} md={3}>
          {" "}
          <DashboardadminCard
            title="บทบาท"
            data={role.length}
            icon={<AdminPanelSettingsIcon />}
          />
        </Grid>
        <Grid item xs={1} md={3}>
          {" "}
          <DashboardadminCard title="สถานะ" data={status} icon={<FlagIcon />} />
        </Grid>
        <Grid item xs={1} md={3}>
          {" "}
          <DashboardadminCard
            title="แผนก"
            data={department.length}
            icon={<ApartmentIcon />}
          />
        </Grid>
        {/* <Grid item xs={1} md={2}> */}
        {/*   {" "} */}
        {/*   <DashboardadminCard title="ประเภทอุปกรณ์" data={device} /> */}
        {/* </Grid> */}
        {/* <Grid item xs={1} md={2}> */}
        {/*   {" "} */}
        {/*   <DashboardadminCard title="ประเภทปัญหา" /> */}
        {/* </Grid> */}
      </Grid>
      <Typography variant="h4" sx={{ mt: 4, mb: 3 }}>
        การจัดการด่วน
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={1} md={3}>
          <AdminQuickActionCard
            icon=<PersonAddIcon sx={{ color: "green", fontSize: 50 }} />
            title="ผู้ใช้งาน"
            subtitle="เพิ่มผู้ใช้งาน"
            func={() => setOpenAddUserDialog(true)}
          />
        </Grid>
        <Grid item xs={1} md={3}>
          <AdminQuickActionCard
            icon={<AddModeratorIcon sx={{ color: blue[400], fontSize: 50 }} />}
            title="บทบาท"
            subtitle="เพิ่มบทบาท"
            func={() => handleAddRoleDialog()}
          />
          <AddRoleDialog
            open={openAddRoleDialog}
            onClose={handleCloseAddRoleDialog}
          />
        </Grid>
        <Grid item xs={1} md={3}>
          <AdminQuickActionCard
            icon={<FlagIcon sx={{ color: yellow[400], fontSize: 50 }} />}
            title="สถานะ"
            subtitle="เพิ่มสถานะ"
            func={() => handleAddStatusDialog()}
          />
          <AddStatusDialog
            open={openAddStatusDialog}
            onClose={handleCloseAddStatusDialog}
          />
        </Grid>
        <Grid item xs={1} md={3}>
          <AdminQuickActionCard
            icon={
              <ApartmentIcon sx={{ color: deepOrange[400], fontSize: 50 }} />
            }
            title="แผนก"
            subtitle="เพิ่มแผนก"
            func={() => handleAddDepartmentDialog()}
          />
          <AddDepartmentDialog
            open={openAddDepartmentDialog}
            onClose={handleCloseDepartmentDialog}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Adminpages;
