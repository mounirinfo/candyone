"use client";

import { Typography, styled } from "@mui/material";

const BonusTitle = styled(Typography)(({ theme }) => ({
  fontSize: 28,
  fontWeight: 900,
  color: "#aaf",
  textShadow: "0 0 12px rgba(170,170,255,.8)",
  marginBottom: theme.spacing(1),
}));

export default BonusTitle;