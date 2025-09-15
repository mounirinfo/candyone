"use client";

import { Box, styled } from "@mui/material";

const ClipRight = styled(Box)(({ theme }) => ({
  borderTopLeftRadius: 120,
  borderBottomLeftRadius: 120,
  marginTop: theme.spacing(-4),   
  marginRight: theme.spacing(-26),
  overflow: "hidden",
  img: { display: "block", width: "80%", height: "auto" },
}));

export default ClipRight;