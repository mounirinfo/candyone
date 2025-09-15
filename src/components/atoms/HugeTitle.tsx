"use client";

import { Typography, styled } from "@mui/material";

const HugeTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: 44,
  textTransform: "uppercase",
  letterSpacing: 1,
}));

export default HugeTitle;