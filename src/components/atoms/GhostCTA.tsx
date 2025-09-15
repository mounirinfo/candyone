"use client";

import { Button, styled } from "@mui/material";

const GhostCTA = styled(Button)(({ theme }) => ({
  textTransform: "uppercase",
  letterSpacing: 3,
  borderRadius: 8,
  border: "2px solid rgba(255,255,255,.9)",
  color: "#fff",
  padding: theme.spacing(1.2, 2.5),
  background: "transparent",
  fontWeight: 900,
  ":hover": { background: "rgba(255,255,255,.1)" },
}));

export default GhostCTA;