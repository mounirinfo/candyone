"use client";

import { Button, styled } from "@mui/material";

const PillCTA = styled(Button)(({ theme }) => ({
  textTransform: "none",
  borderRadius: 999,
  background: "#000",
  color: "#9cff57",
  fontWeight: 900,
  padding: theme.spacing(1.8, 5),
  alignSelf: "flex-start",
  ":hover": { background: "#111" },
}));

export default PillCTA;