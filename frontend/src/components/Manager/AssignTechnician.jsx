import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Paper, Grid, Box, Typography, Stack, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
function AssignTechnician() {
  const token = useSelector((state) => state.user.token);
  const usersID = useSelector((state) => state.user.users_id);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [tickets, setTickets] = useState();
  const [usersTech, setUserTech] = useState([]);
  console.log("apiurl", apiUrl);
  const { tickets_id } = useParams();
  const navigate = useNavigate();
  const assignTechToticket = (technicianID) => {
    axios
      .patch(
        `${apiUrl}/tickets/${tickets_id}/assign-technician`,
        {
          technician_id: technicianID,
          manager_id: usersID,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then(() => navigate(-1));
  };

  useEffect(() => {
    try {
      const fetchUserRolesTechData = () => {
        // This api is want role_id to query db with role_id
        const role_id = 3;

        axios
          .get(`${apiUrl}/users/${role_id}/role`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => setUserTech(response.data.result))
          .catch((error) => console.log(error));
      };
      fetchUserRolesTechData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log("dicccccccccccccc", usersID);
  console.log("usertech", tickets);
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Typography>icon</Typography>
        <Typography fontWeight="bold"> เลือกช่างสำหรับ Ticket</Typography>
      </Stack>
      <Typography sx={{ color: "slategrey" }}>
        เลือกช่างที่เหมาะสมเพื่อมอบหมายงานให้กับ ticket นี้
      </Typography>
      <Grid container spacing={2}>
        {usersTech.map((item, index) => (
          <Grid item xs={12} sm={6} md={6}>
            <Paper
              sx={{
                height: "200px",
                width: "100%",
                border: "1px solid blue",
                borderRadius: 2,
              }}
            >
              <Typography>{item.user_id}</Typography>
              <Typography>ticket{item.ticket_id}</Typography>
              <Typography>{item.first_name + " " + item.last_name}</Typography>
              <Button
                onClick={() => {
                  assignTechToticket(item.user_id);
                }}
              >
                assign
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default AssignTechnician;
