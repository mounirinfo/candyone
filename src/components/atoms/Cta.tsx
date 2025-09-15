"use client"
import { Button, styled } from "@mui/material";

const Cta = styled(Button)(({ theme }) => ({
  alignSelf: "flex-start",
  textTransform: "none",
  borderRadius: 999,
  background: "#000",
  color: "#fff",
  padding: theme.spacing(1.5, 3.25),
  fontWeight: 800,
  ":hover": { background: "#111" },
}));

export default Cta;