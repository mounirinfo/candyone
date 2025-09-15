"use client"
import React from "react";
import { Typography, styled } from "@mui/material";

const Pink = "#ff48b0";

const BigWeeks = styled(Typography)(({ theme }) => ({
  color: Pink,
  fontWeight: 900,
  fontSize: 44,
  letterSpacing: 1,
  textShadow: `0 6px 0 rgba(255,72,176,.25)`,
}));

export default BigWeeks;