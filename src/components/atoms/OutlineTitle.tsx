"use client";

import { Typography, styled } from "@mui/material";

const OutlineTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  letterSpacing: 2,
  textTransform: "uppercase",
  fontSize: 54,
  lineHeight: 1,
}));

export default OutlineTitle;