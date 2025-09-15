"use client";

import { Button, styled } from "@mui/material";

const ReserveBtn = styled(Button)(({ theme }) => ({
  borderRadius: 10,
  width : "250px",
  background: "#000",
  color: "#d48cff", 
  fontWeight: 900,
  fontSize: "2.2rem",
  padding: theme.spacing(1.6, 4),
  textTransform: "uppercase",
  textShadow: "0 0 10px #d48cff, 0 0 20px #d48cff, 0 0 30px #d48cff", 
  ":hover": { background: "#111" },
    transform: "translateX(100px)",

}));

export default ReserveBtn;
