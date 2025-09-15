"use client"
import { styled } from "@mui/material";

const Lead = styled("p")(({ theme }) => ({
  fontSize: "1.2rem",           
  lineHeight: 1.8,              
  marginBottom: theme.spacing(2), 
  fontWeight: 400,
  color: theme.palette.text.primary, 
}));

export default Lead;
