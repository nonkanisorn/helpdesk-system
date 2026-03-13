import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const Detailcase = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticket_id } = useParams();
  const [ticketdatabyID, setticketdatabyID] = useState([]);
  const [imgurl, setImgUrls] = useState([]);
  const status_id = 2;
  const [technician, settechnician] = useState([]);
  const [selectedTechnicians, setSelectedTechnicians] = useState({});
  const { ticketData } = location.state || {};
  const [refresh, setRefresh] = useState(false);
  const manager_id = useSelector((state) => state.user.user_id);
  const [ticketById, setticketById] = useState();
  console.log("ticket_id", ticket_id);
  const sendtech = async (ticket_id, techid) => {
    await axios
      .patch(`http://localhost:5011/addtechticket/${ticket_id}`, {
        technician_id: techid,
        manager_id,
        status_id,

        // ticket_device_id: ticketData[0].ticket_device_id,
      })
      .then(() => {
        setSelectedTechnicians({});
        setRefresh(true); // ตั้งค่า refresh ให้เป็น true หลังจากการส่งข้อมูลสำเร็จ
        navigate("/manager/reportticket");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const technicianResponse = await axios.get(
          "http://localhost:5011/technicians/role",
        );
        const technicianData = await technicianResponse.data.map(
          (technician) => ({
            id: technician.user_id,
            full_name: technician.full_name,
            user_img: technician.user_img,
            email: technician.email,
            phone: technician.phone,
          }),
        );
        settechnician(technicianData);
        const imgUrlArray = technician.map((item, idx) => {
          if (item.user_img) {
            console.log("มีค่า", idx);
            const user = item.user_img;
            const array = new Uint8Array(user.data);
            const blob = new Blob([array], { type: "image/jpeg" });
            return URL.createObjectURL(blob);
          } else {
            return null;
          }
        });
        setImgUrls(imgUrlArray);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchticketById = async () => {
      // const { ticket_id } = useParams();
      try {
        const res = await axios.get(
          `http://localhost:5011/ticketid/${ticket_id}`,
        );
        console.log(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
    fetchticketById();
  }, [ticket_id]);
  useEffect(() => {
    if (refresh) {
      setRefresh(false); // รีเซ็ต refresh หลังจากการดึงข้อมูลใหม่เสร็จสมบูรณ์
    }
  }, [refresh]);
  return (
    <Box>
      <Grid container spacing={2}>
        {technician.map((tech, index) => (
          <Grid item key={tech.id} lg={6} sm={12} xs={12} md={12} xl={6}>
            <Card sx={{ height: 300, width: 500, bgcolor: "#eeeeee" }}>
              <Box display="flex" justifyContent="space-around">
                <CardContent>
                  <Typography variant="h5" color="text.secondary">
                    ข้อมูลรายละเอียดช่าง
                  </Typography>
                  <br />
                  <Typography variant="h5">{tech.full_name}</Typography>
                  <br />
                  <Typography color="text.secondary">
                    Email: {tech.email}
                  </Typography>
                  <Typography color="text.secondary">
                    Phone: {tech.phone}
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  image={imgurl[index] || "../../../public/assets/user.png"}
                  sx={{ width: 195, borderRadius: "50%" }}
                ></CardMedia>
              </Box>
              <CardActions
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  mt: 2,
                }}
              >
                <Button
                  variant="contained"
                  size="medium"
                  color="success"
                  sx={{ mb: 3, mr: 3 }}
                  onClick={() => {
                    sendtech(ticket_id, tech.id);
                  }}
                >
                  {" "}
                  เพิ่มช่าง
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
