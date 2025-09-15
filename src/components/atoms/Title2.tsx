"use client"
import { Typography, styled } from "@mui/material";

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontFamily: "Impact, sans-serif",
  fontSize: 100,
  letterSpacing: 1,
  textTransform: "uppercase",
  color: "transparent", 
  WebkitTextStroke: "0.5px black", 
  backgroundColor: "transparent",
}));

export default Title;  

