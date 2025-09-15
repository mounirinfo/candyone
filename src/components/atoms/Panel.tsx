"use client";

import { Box, styled } from "@mui/material";

const PanelBg = "#f7c9e3";

const Panel = styled(Box)(({ theme }) => ({
  background: PanelBg,
  borderRadius: 24,
  padding: theme.spacing(4),
}));

export default Panel;