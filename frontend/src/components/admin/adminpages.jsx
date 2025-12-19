import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Paper, Box, Typography, Grid, Stack } from "@mui/material";
import DashboardadminCard from "./DashboardadminCard";
import AdminQuickActionCard from "./AdminQuickActionCard";
function Adminpages() {
  const [role, setRole] = useState();
  const [user, setUser] = useState();
  const [device, setDevice] = useState();
  const [status, setStatus] = useState();
  const [department, setDepartment] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchRoleData = await axios.get(`http://localhost:5011/roles`);
        setRole(fetchRoleData.data.length);

        const fetchUserData = await axios.get(`http://localhost:5011/users`);
        setUser(fetchUserData.data.length);

        const fetchDeviceData = await axios.get(`http://localhost:5011/device`);
        setDevice(fetchDeviceData.data.length);

        const fetchStatusData = await axios.get(`http://localhost:5011/status`);
        setStatus(fetchStatusData.data.length);

        const fetchDepartmentData = await axios.get(
          `http://localhost:5011/departments`,
        );
        setDepartment(fetchDepartmentData.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Typography variant="h4" fontWeight="fontWeightBold">
        Admin Dashboard
      </Typography>
      <Typography color="grey" sx={{ mb: 3 }}>
        ภาพรวมระบบและการจัดการทั้งหมด
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={1} md={2}>
          <DashboardadminCard />
        </Grid>
        <Grid item xs={1} md={2}>
          {" "}
          <DashboardadminCard />
        </Grid>
        <Grid item xs={1} md={2}>
          {" "}
          <DashboardadminCard />
        </Grid>
        <Grid item xs={1} md={2}>
          {" "}
          <DashboardadminCard />
        </Grid>
        <Grid item xs={1} md={2}>
          {" "}
          <DashboardadminCard />
        </Grid>
        <Grid item xs={1} md={2}>
          {" "}
          <DashboardadminCard />
        </Grid>
      </Grid>
      <Typography variant="h4" sx={{ mt: 4, mb: 3 }}>
        การจัดการด่วน
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={1} md={3}>
          <AdminQuickActionCard title="ผู้ใช้งาน" subtitle="เพิ่มผู้ใช้งาน" />
        </Grid>
        <Grid item xs={1} md={3}>
          <AdminQuickActionCard title="บทบาท" subtitle="เพิ่มบทบาท" />
        </Grid>
        <Grid item xs={1} md={3}>
          <AdminQuickActionCard
            title="ประเภทของปัญหา"
            subtitle="ประประเภทของปัญหา"
          />
        </Grid>
        <Grid item xs={1} md={3}>
          <AdminQuickActionCard title="แผนก" subtitle="เพิ่มแผนก" />
        </Grid>
      </Grid>
    </>
  );
}

export default Adminpages;
