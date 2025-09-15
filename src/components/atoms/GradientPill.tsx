"use client";

import { Box, styled } from "@mui/material";

const GradientPill = styled(Box)(({ theme }) => ({
  display: "inline-block",       // s'adapte au contenu
  background: "#33e0fe",
  color: "#fec7fa",
  borderRadius: 999,
  padding: theme.spacing(1.2, 2.2),
  boxShadow: "0 12px 30px rgba(0,0,0,.2)",
  whiteSpace: "nowrap",          // empêche le texte de passer à la ligne
}));

export default GradientPill;
