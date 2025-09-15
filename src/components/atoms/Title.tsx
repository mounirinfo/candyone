"use client"
import { Typography, styled } from "@mui/material";

const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontFamily: "Impact, sans-serif", 
  fontSize: 80,
  letterSpacing: 1,
  color: '#000000ff',
  margin: 0,


  textTransform: "uppercase",
}));

export default Title;