"use client"
import { Typography, styled } from "@mui/material";

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontFamily: "Impact, sans-serif",
  fontSize: 60, // ✅ valeur par défaut (mobile-first)
  letterSpacing: 1,
  textTransform: "uppercase",
  color: "transparent",
  WebkitTextStroke: "0.5px black",
  backgroundColor: "transparent",

  // tablette (>=600px)
  [theme.breakpoints.up("sm")]: {
    fontSize: 80,
  },

  // desktop (>=900px)
  [theme.breakpoints.up("md")]: {
    fontSize: 100,
  },
}));

export default Title;
