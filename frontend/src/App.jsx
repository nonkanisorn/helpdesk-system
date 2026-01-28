import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import "@mui/material/styles/styled";

import "./App.css";
//------iimport layout------//
//ADMIN

import Headerbaradmin from "./layout/admin/Headerbaradmin";
import Sidebaradmin from "./layout/admin/Sidebaradmin";

//USER
import Headerbaruser from "./layout/users/Headerbaruser";
import Sidebaruser from "./layout/users/Sidebaruser";

//------Route------//
//ADMIN

import LoginPage from "./components/LoginPage";

//USER

//Manager
import Reportcasetechnician from "./components/technician/Reportcasetech";
import ManagerRoute from "./Routes/ManagerRoute";
import { login } from "./store/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import UserRoute from "./Routes/UserRoute";
import AdminRoute from "./Routes/AdminRoute";
import { useState } from "react";
import Notfound404 from "./components/Notfound404";
import ResponsiveAppBar from "./layout/ResponsiveAppBar";
import TechnicianRoute from "./Routes/TechnicianRoute";
import Profile from "./components/Profile";
import { useSelector } from "react-redux";
import Headerbarmanager from "./layout/manager/Headerbarmanager";
import Sidebarmanager from "./layout/manager/Sidebarmanager";
import Headerbartech from "./layout/tech/Headerbartech";
import Sidebartech from "./layout/tech/Sidebartech";
import Testapi from "./components/Testapi";
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role_id = useSelector((state) => state.user.role_id);
  const users_id = useSelector((state) => state.user.users_id);
  const [loading, setLoading] = useState(true); // เพิ่ม state สำหรับตรวจสอบการโหลด
  const token = useSelector((state) => state.user.token);
  // const checktimerepair = async () => {
  //   try {
  //     const res = await axios
  //       .get(`${process.env.REACT_APP_API_URL}/checktimecase`)
  //       .then((res) => {});
  //   } catch (error) {}
  // };
  const currentUser = async (token, userID) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/current-user/${userID}`;
      // console.log("GET", url);

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // console.log("currentUser res.data =", res.data);

      // ✅ กันพัง: รองรับหลายรูปแบบ response
      const u =
        res?.data?.user ||
        res?.data?.data?.user ||
        res?.data?.result ||
        (Array.isArray(res?.data?.user) ? res.data.user[0] : null);

      if (!u) {
        console.error("currentUser: user not found in response", res.data);
        return null;
      }

      dispatch(
        login({
          users_id: u.user_id || u.id,
          first_name: u.first_name,
          last_name: u.last_name,
          role_id: u.role_id,
          dep_id: u.department_id,
          token,
        }),
      );

      return res.data;
    } catch (error) {
      console.error(
        "Error fetching current user:",
        error?.response?.data || error,
      );
      return null;
    }
  };
  // const currentUser = async (token, userID) => {
  //   try {
  //     const res = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/current-user/${userID}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );
  //
  //     const u = res.data.user;
  //
  //     dispatch(
  //       login({
  //         users_id: u.id,
  //         first_name: u.first_name,
  //         last_name: u.last_name,
  //         role_id: u.role_id,
  //         dep_id: u.department_id,
  //         token,
  //       }),
  //     );
  //
  //     return res.data;
  //   } catch (error) {
  //     console.error("Error fetching current user:", error);
  //
  //     // ถ้า token ใช้ไม่ได้ แนะนำ logout + ล้าง storage
  //     // dispatch(logout());
  //
  //     return null;
  //   }
  // };

  useEffect(() => {
    const boot = async () => {
      // console.log("boot start");

      const saved = localStorage.getItem("user");
      // console.log("saved", saved);

      if (!saved) {
        setLoading(false);
        return;
      }

      let parsed;
      try {
        parsed = JSON.parse(saved);
      } catch (e) {
        // console.log("parse failed", e);
        localStorage.removeItem("user");
        setLoading(false);
        return;
      }

      const savedToken = parsed?.token;
      const savedUserId = parsed?.users_id;
      // console.log("token/id", savedToken, savedUserId);

      if (!savedToken || !savedUserId) {
        setLoading(false);
        return;
      }

      dispatch(login(parsed));
      // console.log("calling currentUser");

      const result = await currentUser(savedToken, savedUserId);
      // console.log("currentUser result", result);

      setLoading(false);
    };

    boot();
  }, [dispatch]);
  // useEffect(() => {
  //   const boot = async () => {
  //     const saved = localStorage.getItem("user");
  //     if (!saved) {
  //       setLoading(false);
  //       return;
  //     }
  //
  //     let parsed;
  //     try {
  //       parsed = JSON.parse(saved);
  //     } catch (e) {
  //       localStorage.removeItem("user");
  //       setLoading(false);
  //       return;
  //     }
  //
  //     const savedToken = parsed?.token;
  //     const savedUserId = parsed?.users_id;
  //
  //     if (!savedToken || !savedUserId) {
  //       setLoading(false);
  //       return;
  //     }
  //
  //     // เติม redux แบบเร็ว ๆ ก่อน
  //     dispatch(login(parsed));
  //
  //     // รอ backend ยืนยัน user
  //     await currentUser(savedToken, savedUserId);
  //
  //     setLoading(false);
  //   };
  //
  //   boot();
  // }, [dispatch]);

  if (loading) return null;
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/testapi" element={<Testapi />} />
        <Route
          path="/profile"
          element={
            role_id === 1 ? (
              <React.Fragment>
                <div className="app">
                  <Sidebaradmin />
                  <main className="content">
                    <Headerbaradmin />
                    <div className="content_body">
                      <Box m="19px">
                        <Profile />
                      </Box>
                    </div>
                  </main>
                </div>
              </React.Fragment>
            ) : role_id === 2 ? (
              <React.Fragment>
                <div className="app">
                  <Sidebarmanager />
                  <main className="content">
                    <Headerbarmanager />
                    <div className="content_body">
                      <Box m="19px">
                        <Profile />
                      </Box>
                    </div>
                  </main>
                </div>
              </React.Fragment>
            ) : role_id === 3 ? (
              <React.Fragment>
                <div className="app">
                  <Sidebartech />
                  <main className="content">
                    <Headerbartech />
                    <div className="content_body">
                      <Box m="19px">
                        <Profile />
                      </Box>
                    </div>
                  </main>
                </div>
              </React.Fragment>
            ) : role_id === 4 ? (
              <React.Fragment>
                <div className="app">
                  {/* <Sidebaruser /> */}
                  <main className="content">
                    <Headerbaruser />
                    <div className="content_body">
                      <Box m="19px">
                        <Profile />
                      </Box>
                    </div>
                  </main>
                </div>
              </React.Fragment>
            ) : null
          }
        />
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/user/*" element={<UserRoute />} />
        <Route path="/manager/*" element={<ManagerRoute />} />
        <Route path="/technician/*" element={<TechnicianRoute />} />
        <Route path="*" element={<Notfound404 text="ไม่มีpath" />} />
      </Routes>
    </>
  );
}
export default App;
