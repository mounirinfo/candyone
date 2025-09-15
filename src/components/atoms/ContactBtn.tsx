"use client";

import { Button, styled } from "@mui/material";

const ContactBtn = styled(Button)(({ theme }) => ({
  
  fontWeight: 700,
  fontFamily: "Impact, sans-serif",
  fontSize: 50,
  letterSpacing: 1,
  textTransform: "uppercase",
  color: "transparent", 
  WebkitTextStroke: "1px white", 
  backgroundColor: "#faaedc",
}));

export default ContactBtn;