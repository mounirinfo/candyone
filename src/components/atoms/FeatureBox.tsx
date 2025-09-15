"use client";

import { Box, styled } from "@mui/material";

const Gradient = "linear-gradient(90deg, #fd7bcb, #ffffffff)";

const FeatureBox = styled(Box)(({ theme }) => ({
  background: Gradient,
  
  borderBottom: "0.5px solid rgba(255,255,255,.4)",
  textAlign: "center",
  padding: theme.spacing(2),
  fontWeight: 600,
  color : "white",
  fontSize: 20,
  flex: 2,
width: "100%",
}));

export default FeatureBox;
