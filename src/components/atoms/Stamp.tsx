"use client"
import React from "react";
import { Box, styled } from "@mui/material";

const Stamp = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1),
  background: "#000",
  color: "#fff",
  padding: theme.spacing(0.5, 1.25),
  borderRadius: 10,
  fontWeight: 900,
  boxShadow: "0 8px 16px rgba(0,0,0,.2)",
}));

export default Stamp;