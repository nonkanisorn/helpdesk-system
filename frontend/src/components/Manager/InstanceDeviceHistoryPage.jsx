import {
  Paper,
  Typography,
  Stack,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const InstanceDeviceHistoryPage = () => {
  const { instance_id } = useParams();
  const [instanceData, setInstanceData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(instanceData.length);
  useEffect(() => {
    try {
      axios
        .get(`${apiUrl}/device/instance/${instance_id}/history-repair`)
        .then((res) => {
          console.log(res);
          setInstanceData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      {instanceData.length === 0 ? (
        <Typography>ไม่พบประวัติการซ่อมของอุปกรณ์</Typography>
      ) : (
        <>
          <Typography variant="h3">ประวัติการซ่อม</Typography>
          <Typography variant="subtitle1" color="grey">
            {instanceData[0].dev_name}
          </Typography>
          <Paper sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              ข้อมูลอุปกรณ์
            </Typography>
            <Stack spacing={2} direction="row" justifyContent="space-between">
              <Box>
                <Typography color="grey">รหัสอุปกรณ์</Typography>
                <Typography>{instanceData[0].serial_number}</Typography>
              </Box>
              <Box>
                <Typography color="grey">หมวดหมู่</Typography>
                <Chip label={instanceData[0].devicetype_name}></Chip>
              </Box>
              <Box>
                <Typography color="grey">แผนก</Typography>
                <Typography>แผนกdaata</Typography>
              </Box>
              <Box>
                <Typography color="grey">การซ่อมครั้งล่าสุด</Typography>
                <Typography>data</Typography>
              </Box>
              <Box>
                <Typography color="grey">จำนวครั้งที่ซ่อม</Typography>
                <Typography>{instanceData.length}</Typography>
              </Box>
            </Stack>
          </Paper>
          <Paper sx={{ mt: 3, borderRadius: 4, p: 4 }}>
            <Typography variant="h4">ประวัติการซ่อมทั้งหมด</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>รหัสงาน</TableCell>
                    <TableCell>วันที่แจ้ง</TableCell>
                    <TableCell>ปัญหา</TableCell>
                    <TableCell>ช่างผู้รับผิดชอบ</TableCell>
                    <TableCell>สถานะ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {instanceData.map((data, index) => (
                    <TableRow>
                      <TableCell>{data.case_id}</TableCell>
                      <TableCell>{data.created_date}</TableCell>
                      <TableCell>{data.case_title}</TableCell>
                      <TableCell>{data.name}</TableCell>
                      <TableCell>{data.status_name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}
    </>
  );
};

export default InstanceDeviceHistoryPage;
