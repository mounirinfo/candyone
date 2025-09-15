"use client";

import { Box, styled } from "@mui/material";

const Pink = "#ff48b0";

const RibbonBar = styled(Box)(({ theme }) => ({
  alignSelf: "flex-start",
  background: `linear-gradient(90deg, ${Pink}, #b84dff)`,
  color: "#fff",
  borderRadius: 12,
  padding: theme.spacing(1, 2),
  fontWeight: 900,
  textAlign: "center",
  boxShadow: "0 12px 24px rgba(0,0,0,.25)",
}));

export default RibbonBar;