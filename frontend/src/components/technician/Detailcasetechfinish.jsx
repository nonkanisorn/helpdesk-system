import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Paper, Typography } from "@mui/material";

import Button from "@mui/material/Button";
import History from "../History";
function Detailcasetechfinish() {
  const { case_id } = useParams();
  const [casedatabyID, setcasedatabyID] = useState([]);
  const [imgurl, setImgUrls] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:5011/caseid/${case_id}`)
      .then(function (response) {
        // console.log(response)
        setcasedatabyID(response.data);
        console.log("case", casedatabyID);
        const urls = response.data.map((casedata) => {
          const bufferData = new Uint8Array(casedata.case_img.data);
          const blob = new Blob([bufferData], { type: "image/jpeg" });

          return URL.createObjectURL(blob);
        });
        setImgUrls(urls);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, [case_id]);
  console.log(casedatabyID);
  return <History />;
}

export default Detailcasetechfinish;
