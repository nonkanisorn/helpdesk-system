import * as React from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { useForm } from "react-hook-form";

import InputLabel from "@mui/material/InputLabel";
import { Button, IconButton, Typography, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";

import axios from "axios";

import { useSelector } from "react-redux";

import { useRef, useState, useEffect } from "react";

function Addcase() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const token = useSelector((state) => state.user.token);
  const [issues, setIssues] = useState([]);
  const [fetchtrigger, setFetchtrigger] = useState(false);
  const [selectcategory, setSelectcategory] = useState("");
  const status_id = 1;
  const apiUrl = process.env.REACT_APP_API_URL;
  const userID = useSelector((state) => state.user.users_id);
  const createCase = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5011/tickets",
        {
          user_id: userID,
          status_id,
          title: data.title,
          description: data.description,
          issue_categories_id: data.issues_categories_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      //ใช้ NOT ! เพื่อsetFetchtrigger ให้เปลี่ยนค่า จากเดิมที่กดหนดเป็นfalse ให้เป็นtrue
      setFetchtrigger(!fetchtrigger);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      const fetchdata = async () => {
        const response = await axios.get(apiUrl + "/issues", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIssues(response.data.result);
      };
      fetchdata();
    } catch (error) {
      // console.log(error);
    }
  }, []);
  // console.log(selectcategory);
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
            <form onSubmit={handleSubmit(createCase)}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* หัวข้อ */}
                <Typography>ชื่องาน *</Typography>
                <TextField
                  label="หัวข้อ"
                  placeholder="กรอกหัวข้อการแจ้งซ่อม"
                  fullWidth
                  {...register("title")}
                />

                {/* รายละเอียด */}
                <Typography>รายละเอียดปัญหา *</Typography>
                <TextField
                  label="รายละเอียด"
                  placeholder="กรอกรายละเอียดปัญหา"
                  multiline
                  rows={4}
                  fullWidth
                  {...register("description")}
                />

                {/* ประเภทปัญหา */}
                <Typography>ประเภทปัญหา</Typography>
                <FormControl fullWidth>
                  <InputLabel id="problem-type-label">ประเภทปัญหา</InputLabel>
                  <Select
                    sx={{}}
                    labelId="problem-type-label"
                    value={selectcategory}
                    {...register("issues_categories_id")}
                    onChange={(e) => setSelectcategory(e.target.value)}
                  >
                    {issues.map((item) => (
                      <MenuItem key={item.issues_id} value={item.issues_id}>
                        {item.issues_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* ปุ่ม */}
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ mt: 2, py: 1.5, bgcolor: "#2764E7" }}
                >
                  เพิ่มการแจ้งซ่อม
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default Addcase;
