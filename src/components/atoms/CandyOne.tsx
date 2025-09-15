"use client";

import { Typography, styled } from "@mui/material";

const CandyOne = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontFamily: "Impact, sans-serif",
  fontSize: 80,
  letterSpacing: 1,
  color: '#fec7fa',
  textShadow: `
    0 0 10px rgba(244, 56, 150, 1),
    0 0 20px rgba(255, 14, 135, 0.98),
    0 0 30px rgba(235, 150, 215, 1)
  `,
  textTransform: "uppercase",
  transform: "translateX(20px)",
}));

export default CandyOne;
