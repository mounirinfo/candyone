"use client";

import { Typography, styled } from "@mui/material";

const ScriptPrice = styled(Typography)(({ theme }) => ({
  fontFamily: '"Brush Script MT", "Comic Sans MS", cursive',
  fontSize: 45,
  fontWeight: 100,
  color: "#ffffff", // blanc pur
  textShadow: "2px 2px 6px #000000, -2px -2px 6px #000000", // ombre externe noire
}));

export default ScriptPrice;
