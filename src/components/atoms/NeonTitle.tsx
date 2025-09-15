"use client"
import React from "react";
import { Typography, styled } from "@mui/material";

const NeonCyan = "#b4f1ff";

const NeonTitle = styled(Typography)(({ theme }) => ({
  color: NeonCyan,
  fontWeight: 800,
  letterSpacing: 2,
  fontSize: 40,
  textShadow: `0 0 10px ${NeonCyan}, 0 0 20px ${NeonCyan}`,
}));

export default NeonTitle;