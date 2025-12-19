import React from "react";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebaruser from "../layout/users/Sidebaruser";
import Headerbaruser from "../layout/users/Headerbaruser";
import User from "../components/user/User";
import Addcase from "../components/user/Addcase";
import Historyrepair from "../components/user/Historyrepair";
import Deletecase from "../components/user/Deletecase";
import Notfound404 from "../components/Notfound404";
import { useNavigate } from "react-router-dom";
import Sidebartech from "../layout/tech/Sidebartech";
import Headerbartech from "../layout/tech/Headerbartech";
import Statuscase from "../components/user/Statuscase";
import Detailcasefinish from "../components/user/Detailcasefinish";
import Detailcase from "../components/Detailcase";
const UserRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  // return user && user.token ? children : <h1>No Login</h1>
  return user?.token ? (
    <div className="app">
      {/* <Sidebaruser /> */}
      <main className="content" style={{ backgroundColor: "#F5F6Fa" }}>
        <Headerbaruser />
        <Box m="19px">
          <Routes>
            <Route path="" element={<User />} />
            <Route path="repair-request" element={<Addcase />} />
            <Route path="repair-history" element={<Historyrepair />} />
            <Route path="deletecase" element={<Deletecase />} />
            <Route path="statuscase" element={<Statuscase />} />
            <Route path="repair-detail/:case_id" element={<Detailcase />} />
            <Route
              path="Detailcasefinish/:case_id"
              element={<Detailcasefinish />}
            />
            <Route path="*" element={<Notfound404 />} />
          </Routes>
        </Box>
      </main>
    </div>
  ) : (
    navigate("/login")
  );
};

export default UserRoute;
