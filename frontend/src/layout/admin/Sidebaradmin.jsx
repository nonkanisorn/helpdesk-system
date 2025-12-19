import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Badge } from "@mui/material";
import { Link } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TableViewIcon from "@mui/icons-material/TableView";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useSelector } from "react-redux";

const Sidebaradmin = () => {
  const [isCollapsed, setisCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const name = useSelector((state) => state.user.name);
  const users_id = useSelector((state) => state.user.users_id);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (users_id) {
      const fetchdata = async () => {
        const response = await axios.get(
          `http://localhost:5011/users/${users_id}`,
        );
        if (
          !response.data[0].user_img ||
          response.data[0].user_img.data.length === 0
        ) {
          // setUrl("../../../public/assets/user.png");
          setUrl("/assets/user.png");
        } else {
          const user = response.data[0];
          console.log(response);
          const array = new Uint8Array(user.user_img.data);
          const blob = new Blob([array], { type: "image/jpeg" });
          const url = URL.createObjectURL(blob);
          setUrl(url);
        }
      };

      fetchdata();
    }
  }, [users_id]);
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        backgroundColor="#234"
        breakPoint="md"
        style={{ height: "100%", border: "none" }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <Menu iconShape="square">
              {/* LOGO */}
              <MenuItem
                onClick={() => setisCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={
                  {
                    // margin: "10px 0 20px 0",
                  }
                }
              >
                {!isCollapsed && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px"
                    bgcolor="#234"
                  >
                    <Typography sx={{ color: "#ffff" }}>HELPDESK</Typography>
                    <IconButton onClick={() => setisCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>
              {!isCollapsed && (
                <Box mb="25px">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img
                      alt="profile-user"
                      width="100px"
                      height="100px"
                      src={url}
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                  </Box>
                  <Box textAlign="center" color="#ffff">
                    <Typography sx={{ m: "10px 0 0 0" }}>{name}</Typography>
                  </Box>
                </Box>
              )}
              <Link to="/admin/index" className="menu-bars ">
                <MenuItem style={{ color: "#fff" }} icon={<HomeOutlinedIcon />}>
                  หน้าหลัก
                </MenuItem>
              </Link>
              <Link to="/admin/manageuser" className="menu-bars">
                <MenuItem style={{ color: "#fff" }} icon={<EditOutlinedIcon />}>
                  จัดการสมาชิก
                </MenuItem>
              </Link>
              <Link to="/admin/Managerole" className="menu-bars">
                <MenuItem style={{ color: "#fff" }} icon={<EditOutlinedIcon />}>
                  จัดการบทบาท
                </MenuItem>
              </Link>
              <Link to="/admin/Managedevice" className="menu-bars">
                <MenuItem style={{ color: "#fff" }} icon={<EditOutlinedIcon />}>
                  จัดการอุปกรณ์
                </MenuItem>
              </Link>
              <Link to="/admin/Managestatus" className="menu-bars">
                <MenuItem style={{ color: "#fff" }} icon={<EditOutlinedIcon />}>
                  จัดการสถานะ
                </MenuItem>
              </Link>
              <Link to="/admin/Managedepartment" className="menu-bars">
                <MenuItem style={{ color: "#fff" }} icon={<EditOutlinedIcon />}>
                  จัดการแผนก
                </MenuItem>
              </Link>
              <Link to="/admin/Managetypedevice" className="menu-bars">
                <MenuItem style={{ color: "#fff" }} icon={<EditOutlinedIcon />}>
                  จัดการประเภทอุปกรณ์
                </MenuItem>
              </Link>
              <Link to="/admin/Managedepartment" className="menu-bars">
                <MenuItem style={{ color: "#fff" }} icon={<EditOutlinedIcon />}>
                  จัดการประเภทปัญหา
                </MenuItem>
              </Link>
            </Menu>
          </div>
        </div>
      </Sidebar>
      <main>
        <div style={{ color: "#44596e" }}>
          <div style={{ marginBottom: "16px" }}>
            {broken && (
              <IconButton onClick={() => setToggled(!toggled)}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default Sidebaradmin;
