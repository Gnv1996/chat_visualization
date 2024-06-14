import React from "react";
import "../loader/Loader.css";
import { Box, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"50vh"}
      flexDirection={"column"}
    >
      <span className="loader"></span>
      <Typography fontWeight={"bold"} pt={2}>Loading....</Typography>
    </Box>
  );
};

export default Loader;
