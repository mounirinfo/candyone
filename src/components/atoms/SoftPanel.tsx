"use client";

import { Box, styled } from "@mui/material";

const Sky = "#ddf9ff"; 

const SoftPanel = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})<{ bgColor?: string }>(({ theme, bgColor }) => ({
  background: bgColor || Sky,
  borderRadius: 24,
  padding: theme.spacing(4),
}));

export default SoftPanel;