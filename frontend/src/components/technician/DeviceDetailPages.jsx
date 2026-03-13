import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Input,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

const DeviceDetailPages = () => {
  const { dev_id } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;

  // data states
  const [deviceDetail, setDeviceDetail] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // dialogs
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedInstance, setSelectedInstance] = useState(null);

  // search (ยังไม่ใช้จริงในตัวอย่าง)
  const [searchSerial, setSearchSerial] = useState("");

  // --- ADD form
  const {
    control: addControl,
    handleSubmit: handleAddSubmit,
    reset: resetAddForm,
  } = useForm({
    defaultValues: { serial_number: "", dep_id: "" },
  });

  // --- EDIT form
  const {
    control: editControl,
    handleSubmit: handleEditSubmit,
    reset: resetEditForm,
  } = useForm({
    defaultValues: { serial_number: "", dep_id: "" },
  });

  // fetch detail (re-run เมื่อ dev_id หรือ refreshKey เปลี่ยน)
  useEffect(() => {
    if (!dev_id) return;
    axios
      .get(`${apiUrl}/device/detail/${dev_id}`)
      .then((res) => setDeviceDetail(res.data))
      .catch((err) => setError(err));
  }, [apiUrl, dev_id, refreshKey]);

  // fetch departments (ครั้งเดียว)
  useEffect(() => {
    axios
      .get(`${apiUrl}/departments/`)
      .then((res) => setDepartments(res.data))
      .catch((err) => setError(err));
  }, [apiUrl]);

  // --- ADD handlers
  const openAdd = () => {
    resetAddForm({ serial_number: "", dep_id: "" }); // เคลียร์ทุกครั้งที่เปิด
    setOpenAddDialog(true);
  };
  const closeAdd = () => {
    resetAddForm();
    setOpenAddDialog(false);
  };
  const onAddSubmit = async (data) => {
    try {
      await axios.post(`${apiUrl}/device/instance`, {
        device_id: dev_id,
        serial_number: data.serial_number,
        dep_id: data.dep_id || null,
      });
      setRefreshKey((k) => k + 1); // รีเฟรชข้อมูลทุกครั้ง
      closeAdd();
    } catch (err) {
      setError(err);
    }
  };

  // --- EDIT handlers
  const openEdit = (row) => {
    setSelectedInstance(row);
    // prefill
    resetEditForm({
      serial_number: row.serial_number || "",
      dep_id: row.dep_id || "",
    });
    setOpenEditDialog(true);
  };
  const closeEdit = () => {
    setSelectedInstance(null);
    resetEditForm();
    setOpenEditDialog(false);
  };
  const onEditSubmit = async (data) => {
    if (!selectedInstance) return;
    try {
      await axios.patch(
        `${apiUrl}/device/instance/${selectedInstance.instance_id}`,
        {
          serial_number: data.serial_number,
          dep_id: data.dep_id || null,
        },
      );
      setRefreshKey((k) => k + 1);
      closeEdit();
      console.log(data.dep_id);
    } catch (err) {
      setError(err);
    }
  };

  //delete instance
  const deleteInstance = (instance_id) => {
    axios.delete(`${apiUrl}/device/instance/${instance_id}`);
    setRefreshKey((k) => k + 1); // รีเฟรชข้อมูลทุกครั้ง
  };

  if (error) return <Typography color="error">โหลดข้อมูลล้มเหลว</Typography>;
  if (!deviceDetail) return <Typography>กำลังโหลด...</Typography>;
  if (!deviceDetail[0])
    return (
      <>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Typography>ไม่มีอุปกรณ์</Typography>
          <Button variant="contained" onClick={openAdd}>
            เพิ่ม
          </Button>
          <Dialog open={openAddDialog} onClose={closeAdd}>
            <DialogTitle>เพิ่มอุปกรณ์</DialogTitle>
            <DialogContent>
              <Box
                component="form"
                id="form-add"
                onSubmit={handleAddSubmit(onAddSubmit)}
                sx={{ mt: 1 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography sx={{ width: 120 }}>รหัสอุปกรณ์</Typography>
                  <Controller
                    name="serial_number"
                    control={addControl}
                    rules={{ required: "กรุณากรอกรหัสอุปกรณ์" }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={{ flex: 1 }}
                      />
                    )}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography sx={{ width: 120 }}>แผนก</Typography>
                  <Controller
                    name="dep_id"
                    control={addControl}
                    render={({ field }) => (
                      <Select {...field} displayEmpty sx={{ minWidth: 220 }}>
                        <MenuItem value="">
                          <em>ไม่ระบุ</em>
                        </MenuItem>
                        {departments.map((d) => (
                          <MenuItem key={d.dep_id} value={d.dep_id}>
                            {d.dep_name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeAdd}>ยกเลิก</Button>
              <Button type="submit" form="form-add" variant="contained">
                เพิ่ม
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </>
    );

  return (
    <>
      {/* ADD DIALOG */}
      <Dialog open={openAddDialog} onClose={closeAdd}>
        <DialogTitle>เพิ่มอุปกรณ์</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            id="form-add"
            onSubmit={handleAddSubmit(onAddSubmit)}
            sx={{ mt: 1 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography sx={{ width: 120 }}>รหัสอุปกรณ์</Typography>
              <Controller
                name="serial_number"
                control={addControl}
                rules={{ required: "กรุณากรอกรหัสอุปกรณ์" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    sx={{ flex: 1 }}
                  />
                )}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography sx={{ width: 120 }}>แผนก</Typography>
              <Controller
                name="dep_id"
                control={addControl}
                render={({ field }) => (
                  <Select {...field} displayEmpty sx={{ minWidth: 220 }}>
                    <MenuItem value="">
                      <em>ไม่ระบุ</em>
                    </MenuItem>
                    {departments.map((d) => (
                      <MenuItem key={d.dep_id} value={d.dep_id}>
                        {d.dep_name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAdd}>ยกเลิก</Button>
          <Button type="submit" form="form-add" variant="contained">
            เพิ่ม
          </Button>
        </DialogActions>
      </Dialog>

      {/* EDIT DIALOG (อยู่นอก map) */}
      <Dialog open={openEditDialog} onClose={closeEdit}>
        <DialogTitle>แก้ไขอุปกรณ์</DialogTitle>
        <DialogContent>
          {selectedInstance && (
            <DialogContentText sx={{ mb: 2 }}>
              รหัสเดิม: {selectedInstance.serial_number} | แผนกเดิม:{" "}
              {selectedInstance.dep_name ?? "-"}
            </DialogContentText>
          )}
          <Box
            component="form"
            id="form-edit"
            onSubmit={handleEditSubmit(onEditSubmit)}
            sx={{ mt: 1 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography sx={{ width: 120 }}>รหัสอุปกรณ์</Typography>
              <Controller
                name="serial_number"
                control={editControl}
                rules={{ required: "กรุณากรอกรหัสอุปกรณ์" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    sx={{ flex: 1 }}
                  />
                )}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography sx={{ width: 120 }}>แผนก</Typography>
              <Controller
                name="dep_id"
                control={editControl}
                render={({ field }) => (
                  <Select {...field} displayEmpty sx={{ minWidth: 220 }}>
                    <MenuItem value="">
                      <em>ไม่ระบุ</em>
                    </MenuItem>
                    {departments.map((d) => (
                      <MenuItem key={d.dep_id} value={d.dep_id}>
                        {d.dep_name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEdit}>ยกเลิก</Button>
          <Button type="submit" form="form-edit" variant="contained">
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>

      {/* HEADER */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">รายละเอียดอุปกรณ์</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Typography>อุปกรณ์: {deviceDetail[0].dev_name}</Typography>
        <Typography>จำนวนทั้งหมด {deviceDetail[0].total_instance}</Typography>
        <Button variant="contained" onClick={openAdd}>
          เพิ่ม
        </Button>
        <Button onClick={() => setRefreshKey((k) => k + 1)}>รีเฟรช</Button>
      </Box>

      {/* SEARCH (ยังไม่ wire) */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Typography>ค้นหา</Typography>
        <Input
          value={searchSerial}
          onChange={(e) => setSearchSerial(e.target.value)}
        />
        <SearchIcon />
      </Box>

      {/* TABLE */}
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 400, // ความสูงสูงสุด (px)
          overflow: "auto", // เปิด scroll แนวตั้ง
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ลำดับ</TableCell>
              <TableCell>รหัสอุปกรณ์</TableCell>
              <TableCell>แผนกที่ใช้งาน</TableCell>
              <TableCell>จัดการ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deviceDetail.map((row, idx) => (
              <TableRow key={row.instance_id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{row.serial_number}</TableCell>
                <TableCell>{row.dep_name ?? "-"}</TableCell>
                <TableCell>
                  <Link
                    to={{
                      pathname: `/technician/instance/${row.instance_id}/history`,
                    }}
                  >
                    <Button>ประวัติการซ่อม</Button>
                  </Link>

                  <Button onClick={() => openEdit(row)}>แก้ไข</Button>
                  {/* ปุ่มลบทำเพิ่มทีหลังได้ */}
                  <Button
                    onClick={() =>
                      confirm("ยืนยันที่ต้องการจะลบ") &&
                      deleteInstance(row.instance_id)
                    }
                  >
                    ลบ{" "}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DeviceDetailPages;
