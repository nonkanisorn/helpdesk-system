import React, { useEffect, useState } from "react";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Badge } from "@mui/material";
import { Link } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import { useSelector } from "react-redux";
import axios from "axios";

const Sidebarmanager = () => {
  const [isCollapsed, setisCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const full_name = useSelector((state) => state.user.full_name);
  const user_id = useSelector((state) => state.user.user_id);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (user_id) {
      const fetchdata = async () => {
        const response = await axios.get(
          `http://localhost:5011/users/${user_id}`,
        );
        if (
          !response.data[0].user_img ||
          response.data[0].user_img.data.length === 0
        ) {
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
  }, [user_id]);

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
        // image="/assets/123.jpg"
        breakPoint="md"
        backgroundColor="#234"
        style={{ height: "100%" }}
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
                style={{
                  margin: "10px 0 20px 0",
                }}
              >
                {!isCollapsed && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px"
                  >
                    <Typography sx={{ color: "white" }}>
                      HELPDESK APP
                    </Typography>
                    <IconButton onClick={() => setisCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon sx={{ color: "white" }} />
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
                  <Box textAlign="center">
                    <Typography sx={{ m: "10px 0 0 0", color: "white" }}>
                      {full_name}
                    </Typography>
                  </Box>
                </Box>
              )}
              <Link to="/manager/index" className="menu-bars">
                <MenuItem
                  icon={<HomeOutlinedIcon />}
                  style={{ color: "white" }}
                >
                  หน้าหลัก
                </MenuItem>
              </Link>
              <Link to="/manager/reportticket" className="menu-bars">
                <MenuItem
                  icon={<ConstructionOutlinedIcon />}
                  style={{ color: "white" }}
                >
                  รายการแจ้งซ่อม
                </MenuItem>
              </Link>
              <Link to="/manager/statusticket" className="menu-bars">
                <MenuItem
                  icon={<HistoryToggleOffIcon />}
                  style={{ color: "white" }}
                >
                  สถานะการซ่อม
                </MenuItem>
              </Link>
              <Link to="/manager/manage/device" className="menu-bars">
                <MenuItem
                  icon={<HistoryToggleOffIcon />}
                  style={{ color: "white" }}
                >
                  จัดการอุปกรณ์
                </MenuItem>
              </Link>
            </Menu>
          </div>
        </div>
      </Sidebar>
      <main>
        <div style={{ padding: "16px 2px ", color: "#44596e" }}>
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
export default Sidebarmanager;
