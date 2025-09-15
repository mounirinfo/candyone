"use client"
import React from "react";
import { Box, styled } from "@mui/material";

const RoundedImage = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  maxWidth: 550, 
  margin: "0 auto", 
  img: {
    display: "block",
    width: "100%",
    height: "auto",
  },
}));

export default RoundedImage;
