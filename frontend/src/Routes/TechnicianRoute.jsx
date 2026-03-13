import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebarmanager from "../layout/manager/Sidebarmanager";
import Headerbarmanager from "../layout/manager/Headerbarmanager";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Notfound404 from "../components/Notfound404";
import TechnicianPage from "../components/technician/TechnicianPage";
import Reportcasetech from "../components/technician/Reportcasetech";
import Sidebartech from "../layout/tech/Sidebartech";
import Headerbartech from "../layout/tech/Headerbartech";
import Detailcasetech from "../components/technician/Detailcasetech";
import Histoyrycase from "../components/technician/Historycase";
import Detailcasetechfinish from "../components/technician/Detailcasetechfinish";
import Managedevice from "../components/technician/Managedevice.jsx";
import DeviceDetailPages from "../components/technician/DeviceDetailPages";
import Detailcase from "../components/Detailcase";
import InstanceDeviceHistoryPage from "../components/technician/InstanceDeviceHistoryPage";
const TechnicianRoute = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  console.log("tech", user);
  useEffect(() => {
    if (!user || !user.token) {
      navigate("/login");
    }
  }, [user, navigate]);
  const text = "No permission";
  return user && user.token && user.role === 3 ? (
    <div className="app">
      <Sidebartech />
      <main className="content" style={{ backgroundColor: "#F5F6Fa" }}>
        <Headerbartech />
        <Box>
          <Box m="20px">
            <Routes>
              <Route path="index" element={<TechnicianPage />} />
              <Route path="*" element={<Notfound404 />} />
              <Route path="repairs/:ticket_id" element={<Detailcase />} />
              <Route path="reporttickettech" element={<Reportcasetech />} />
              <Route path="device" element={<Managedevice />} />
              <Route
                path="device/detail/:dev_id"
                element={<DeviceDetailPages />}
              />
              <Route
                path="instance/:instance_id/history"
                element={<InstanceDeviceHistoryPage />}
              />

              <Route
                path="ticket/:ticket_id/repair"
                element={<Detailcasetech />}
              />
              <Route
                path="detailtickettechfinish/:ticket_id"
                element={<Detailcasetechfinish />}
              />
              <Route path="historyticket" element={<Histoyrycase />} />
            </Routes>
          </Box>
        </Box>
      </main>
    </div>
  ) : (
    <Notfound404 text={text} />
  );
};

export default TechnicianRoute;
