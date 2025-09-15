"use client";

import { Typography, styled } from "@mui/material";

const NameTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
    fontFamily: "Impact, sans-serif", 
  fontSize: 70,
  letterSpacing: 1,
  margin: 0,
textTransform: "uppercase",
  color: "#ff8bd6",
  lineHeight: 1,
}));

export default NameTitle;