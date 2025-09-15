"use client";

import { Typography, styled } from "@mui/material";

const SubTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontFamily: "Impact, sans-serif",
  fontSize: 50,
  letterSpacing: 1,
  textTransform: "uppercase",
  color: "transparent", 
  WebkitTextStroke: "1px white", 
  backgroundColor: "transparent",
}));

export default SubTitle;
