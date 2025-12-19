import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebarmanager from "../layout/manager/Sidebarmanager";
import Headerbarmanager from "../layout/manager/Headerbarmanager";
import { Box } from "@mui/material";
import Reportcase from "../components/Manager/Reportcase";
import Detailcase from "../components/Manager/Detailcase";
import Adduser from "../components/Manager/Adduser";
import { useSelector } from "react-redux";
import Managerpages from "../components/Manager/Managerpages";
import { useEffect } from "react";
import Notfound404 from "../components/Notfound404";
import Statuscase from "../components/Manager/Statuscase";
import Casedetailstatus from "../components/Manager/Casedetailstatus";
import Historydevice from "../components/Manager/ManageDevice";
import Devicehistory from "../components/Manager/Devicehistory";
import ManageDevice from "../components/Manager/ManageDevice";
import DeviceDetailPages from "../components/Manager/DeviceDetailPages";
import InstanceDeviceHistoryPage from "../components/Manager/InstanceDeviceHistoryPage";
const ManagerRoute = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  console.log("manager", user);
  useEffect(() => {
    if (!user || !user.token) {
      navigate("/login");
    }
  }, [user, navigate]);
  const text = "No permission";
  return user && user.token && user.role === 2 ? (
    <div className="app">
      <Sidebarmanager />
      <main className="content" style={{ backgroundColor: "#F5F6Fa" }}>
        <Headerbarmanager />
        <Box>
          <Box m="20px">
            <Routes>
              <Route path="index" element={<Managerpages />} />
              <Route path="reportcase" element={<Reportcase />} />
              <Route path="detail/:case_id" element={<Detailcase />} />
              <Route path="adduser" element={<Adduser />} />
              <Route path="statuscase" element={<Statuscase />} />
              <Route path="manage/device" element={<ManageDevice />} />
              <Route
                path="instance/:instance_id/history"
                element={<InstanceDeviceHistoryPage />}
              />
              <Route
                path="manage/device/:dev_id/instances"
                element={<DeviceDetailPages />}
              />
              <Route
                path="device/history/:dev_id"
                element={<Devicehistory />}
              />
              <Route
                path="casedetail/:case_id"
                element={<Casedetailstatus />}
              />
              <Route path="*" element={<Notfound404 />} />
            </Routes>
          </Box>
        </Box>
      </main>
    </div>
  ) : (
    <Notfound404 text={text} />
  );
};

export default ManagerRoute;
