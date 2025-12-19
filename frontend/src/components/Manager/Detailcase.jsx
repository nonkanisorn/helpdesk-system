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

function Detailcase() {
  const location = useLocation();
  const navigate = useNavigate();
  const { case_id } = useParams();
  const [casedatabyID, setcasedatabyID] = useState([]);
  const [imgurl, setImgUrls] = useState([]);
  const status_id = 2;
  const [technician, settechnician] = useState([]);
  const [selectedTechnicians, setSelectedTechnicians] = useState({});
  const { caseData } = location.state || {};
  const [refresh, setRefresh] = useState(false);
  const manager_id = useSelector((state) => state.user.users_id);
  const [caseById, setCaseById] = useState();
  console.log("case_id", case_id);
  const sendtech = async (case_id, techid) => {
    await axios
      .patch(`http://localhost:5011/addtechcase/${case_id}`, {
        technician_id: techid,
        manager_id,
        status_id,

        // case_device_id: caseData[0].case_device_id,
      })
      .then(() => {
        setSelectedTechnicians({});
        setRefresh(true); // ตั้งค่า refresh ให้เป็น true หลังจากการส่งข้อมูลสำเร็จ
        navigate("/manager/reportcase");
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
            id: technician.users_id,
            name: technician.name,
            user_img: technician.user_img,
            user_email: technician.user_email,
            user_phone: technician.user_phone,
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
    const fetchCaseById = async () => {
      // const { case_id } = useParams();
      try {
        const res = await axios.get(`http://localhost:5011/caseid/${case_id}`);
        console.log(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
    fetchCaseById();
  }, [case_id]);
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
                  <Typography variant="h5">{tech.name}</Typography>
                  <br />
                  <Typography color="text.secondary">
                    Email: {tech.user_email}
                  </Typography>
                  <Typography color="text.secondary">
                    Phone: {tech.user_phone}
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
                    sendtech(case_id, tech.id);
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
}

export default Detailcase;
