import * as React from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

import InputLabel from "@mui/material/InputLabel";
import { Button, IconButton, Typography, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";

import axios from "axios";

import { useSelector } from "react-redux";

import { useRef, useState, useEffect } from "react";

function Addcase() {
  const [ticketDetail, setticketDetail] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [fetchtrigger, setFetchtrigger] = useState(false);
  const [dataDev, setDataDev] = useState([]);
  const [selectcategory, setSelectcategory] = useState("");
  const status_id = 1;
  const apiUrl = process.env.REACT_APP_API_URL;
  const userId = useSelector((state) => state.user.user_id);
  const userName = useSelector((state) => state.user.name);
  const createticket = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:5011/ticket",
        {
          // dep_name: selectedDepartment,
          title,
          description: ticketDetail,
          // ticket_device_id: null,
          user_id: userId,
          status_id,
          issues_categories_id: selectcategory,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      setticketDetail("");
      setTitle("");
      setSelectcategory("");
      //ใช้ NOT ! เพื่อsetFetchtrigger ให้เปลี่ยนค่า จากเดิมที่กดหนดเป็นfalse ให้เป็นtrue
      setFetchtrigger(!fetchtrigger);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(apiUrl + "/device");
        setDataDev(response.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    try {
      const fetchdata = async () => {
        const response = await axios.get(apiUrl + "/issues-categories-device");
        setCategories(response.data);
      };
      fetchdata();
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(selectcategory);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <Box sx={{ maxWidth: 600, width: "100%" }}>
          <Typography variant="h4" fontWeight="fontWeightBold">
            แจ้งซ่อม
          </Typography>
          <Typography variant="subtitle1" color="grey" gutterBottom>
            กรุณากรอกข้อมูลให้ครบถ้วนเพื่อความรวดเร็วในการดำเนินการ
          </Typography>
          <Paper
            sx={{
              p: 5,
              mx: "auto",
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            {/* ฟอร์ม */}
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              {/* หัวข้อ */}
              <Typography>ชื่องาน *</Typography>
              <TextField
                label="หัวข้อ"
                id="ticket_title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="กรอกหัวข้อการแจ้งซ่อม"
                fullWidth
              />

              {/* รายละเอียด */}
              <Typography>รายละเอียดปัญหา *</Typography>
              <TextField
                label="รายละเอียด"
                id="ticket_detail"
                value={ticketDetail}
                onChange={(e) => setticketDetail(e.target.value)}
                placeholder="กรอกรายละเอียดปัญหา"
                multiline
                rows={4}
                fullWidth
              />

              {/* ประเภทปัญหา */}
              <Typography>ประเภทปัญหา</Typography>
              <FormControl fullWidth>
                <InputLabel id="problem-type-label">ประเภทปัญหา</InputLabel>
                <Select
                  sx={{}}
                  labelId="problem-type-label"
                  value={selectcategory}
                  onChange={(e) => setSelectcategory(e.target.value)}
                >
                  {categories.map((item) => (
                    <MenuItem
                      key={item.issues_categories_id}
                      value={item.issues_categories_id}
                    >
                      {item.issues_categories_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* ปุ่ม */}
              <Button
                variant="contained"
                onClick={createticket}
                sx={{ mt: 2, py: 1.5, bgcolor: "#2764E7" }}
              >
                เพิ่มการแจ้งซ่อม
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default Addcase;
