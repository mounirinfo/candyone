"use client";

import { Typography, styled } from "@mui/material";

const SubOutline = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: 3,
  fontSize: 28,
  WebkitTextStroke: "1px #000",
  color: "transparent",
}));

export default SubOutline;