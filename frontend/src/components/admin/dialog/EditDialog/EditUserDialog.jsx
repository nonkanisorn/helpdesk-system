import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Typography,
  Select,
  MenuItem,
  Stack,
  CircularProgress,
} from "@mui/material";

const EditUserDialog = ({
  id,
  open,
  onClose,
  onSuccess,
  roleData,
  depData,
}) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      userpassword: "", // ถ้าไม่อยากให้แก้รหัสผ่าน ให้เอาออกได้
      full_name: "",
      email: "",
      phone: "",
      role_id: "",
      department_id: "",
      is_active: 1,
    },
  });

  const [loading, setLoading] = useState(false);
  console.log("id", id);
  // โหลดข้อมูลเดิมมาใส่ฟอร์มเมื่อเปิด dialog / เปลี่ยน id
  useEffect(() => {
    if (!open || !id) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        // ✅ ปรับ endpoint ตาม backend ของคุณ
        const res = await axios.get(`${apiUrl}/users/${id}`);

        // สมมติ backend ส่ง user object กลับมา
        const u = res.data;

        reset({
          username: u.username ?? "",
          userpassword: u.userpassword ?? "", // ไม่เติม password เดิม (ปกติ backend ก็ไม่ส่งมาอยู่แล้ว)
          full_name: u.full_name ?? "",
          email: u.email ?? "",
          phone: u.phone ?? "",
          role_id: u.role_id ?? null,
          department_id: u.dep_id ?? null,
          is_active: typeof u.is_active === "number" ? u.is_active : 1,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [open, id, apiUrl, reset]);

  const onSubmit = async (data) => {
    try {
      // ✅ ปรับ payload ตาม backend
      // ถ้าไม่ต้องการแก้รหัสผ่าน: ไม่ต้องส่ง userpassword ถ้าเป็น ""
      const payload = {
        username: data.username,
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        role_id: Number(data.role_id),
        department_id: Number(data.department_id),
        is_active: Number(data.is_active),
      };

      // ส่งรหัสผ่านเฉพาะตอนกรอก
      if (data.userpassword && data.userpassword.trim() !== "") {
        payload.userpassword = data.userpassword;
      }

      await axios.patch(`${apiUrl}/users/${id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      onClose?.();
      onSuccess?.();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">แก้ไขผู้ใช้</Typography>
          <Button onClick={onClose}>x</Button>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ pt: 1.5, mb: 2 }}>
          ใช้สำหรับแก้ไขข้อมูลผู้ใช้งานในระบบ
        </DialogContentText>

        {loading ? (
          <Stack alignItems="center" sx={{ py: 3 }}>
            <CircularProgress />
          </Stack>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} id="edit-user-form">
            <Stack spacing={1.2}>
              <Typography>ชื่อผู้ใช้</Typography>
              <TextField {...register("username")} />

              <Typography>รหัสผ่าน (กรอกเมื่ออยากเปลี่ยน)</Typography>
              <TextField type="password" {...register("userpassword")} />

              <Typography>ชื่อ-นามสกุล</Typography>
              <TextField {...register("full_name")} />

              <Typography>อีเมล์</Typography>
              <TextField {...register("email")} />

              <Typography>เบอร์โทรศัพท์</Typography>
              <TextField {...register("phone")} />

              <Typography>บทบาท</Typography>
              <Controller
                control={control}
                name="role_id"
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  >
                    {(roleData ?? []).map((r) => (
                      <MenuItem key={r.role_id} value={r.role_id}>
                        {r.role_name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />

              <Typography>แผนก</Typography>
              <Controller
                control={control}
                name="department_id"
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  >
                    {(depData ?? []).map((d) => (
                      <MenuItem key={d.dep_id} value={d.dep_id}>
                        {d.dep_name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />

              <Typography>สถานะผู้ใช้งาน</Typography>
              <Controller
                control={control}
                name="is_active"
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value ?? 1}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  >
                    <MenuItem value={0}>ไม่พร้อมใช้งาน</MenuItem>
                    <MenuItem value={1}>พร้อมใช้งาน</MenuItem>
                  </Select>
                )}
              />
            </Stack>
          </form>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>ยกเลิก</Button>
        <Button
          form="edit-user-form"
          type="submit"
          variant="contained"
          disabled={loading || isSubmitting}
        >
          บันทึก
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
