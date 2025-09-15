"use client";

import { Button, styled } from "@mui/material";

const SubmitButton = styled(Button)(({ theme }) => ({
  borderRadius: 6,
  background: "#2e7d32",
  color: "#fff",
  textTransform: "none",
  fontWeight: 700,
  padding: theme.spacing(1.5, 2.5),
  ":hover": { background: "#256428" },
}));

export default SubmitButton;