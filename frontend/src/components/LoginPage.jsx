import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";
import { useForm } from "react-hook-form";
import { Stack } from "@mui/system";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const handleLogin = async (data) => {
    console.log(data);
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5011/login", {
        username: data.username,
        password: data.password,
      });
      // ดำเนินการหลังจากเข้าสู่ระบบสำเร็จ

      console.log("responsenaa", response.data.user);
      const is_active = response.data.user.is_active;
      if (is_active === 0) {
        return alert("คุณไม่มีสิทธื์เข้า");
      }
      dispatch(
        login({
          // username: response.data.payload.user,
          role_id: response.data.user.role_id,
          token: response.data.token,
          first_name: response.data.user.first_name,
          last_name: response.data.user.last_name,
          user_id: response.data.user.id,
          department_id: response.data.user.department_id,
        }),
      );
      localStorage.setItem(
        "user",
        JSON.stringify({
          // username: response.data.payload.user,
          first_name: response.data.user.first_name,
          last_name: response.data.user.last_name,
          role_id: response.data.user.role_id,
          token: response.data.token,
          user_id: response.data.user.id,
          department_id: response.data.user.department_id,
        }),
      );
      // localStorage.setItem("token", response.data.token)
      roleRedirects(response.data.user.role_id);
    } catch (error) {
      // ดำเนินการเมื่อมีข้อผิดพลาดเกิดขึ้นในการเข้าสู่ระบบ
      console.error("There was an error logging in!", error);
      alert("Failed to login. Please check your username and password.");
    }
  };
  const roleRedirects = (role) => {
    // console.log(role)
    if (role === 1) {
      navigate("/admin/index");
    } else if (role == 2) {
      navigate("/manager/index");
    } else if (role == 3) {
      navigate("/technician/index");
    } else {
      navigate("/user");
    }
  };
  // useEffect(() => {
  //
  //   handleLogin()
  // }, [])
  return (
    <div className="login">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 1,
          m: 1,
          height: "100vh", // ตั้งค่าความสูงของ Box เพื่อให้ Card อยู่ตรงกลางหน้าจอ
        }}
      >
        <Card sx={{ minWidth: 450, minHeight: 400, borderRadius: 4 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img src="../../public/assets/205.jpg" height={150}></img>
            </Box>

            <Typography
              variant="h4"
              textAlign="center"
              sx={{ mt: 3, fontStyle: "italic" }}
            >
              {/* Sing in */}
            </Typography>
            <Typography
              sx={{}}
              fontWeight="bold"
              variant="h4"
              marginRight={3}
              color="text.primary"
              textAlign={"center"}
              gutterBottom
            ></Typography>
            <form onSubmit={handleSubmit(handleLogin)}>
              <Stack spacing={2}>
                <TextField
                  {...register("username")}
                  label="Username"
                ></TextField>
                <TextField
                  label="Password"
                  type="password"
                  {...register("password")}
                  // {...register("password", {
                  //   minLength: {
                  //     value: 6,
                  //     message: "Password should be at least 6 characters",
                  //   },
                  // })}
                  // label="Password"
                ></TextField>
                {/* {errors.password && ( */}
                {/*   <Typography>{errors.password.message}</Typography> */}
                {/* )} */}
              </Stack>
              <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                <Button type="submit" variant="contained" fullWidth>
                  Login
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
export default LoginPage;
