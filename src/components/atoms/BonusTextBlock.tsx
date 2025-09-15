"use client";

import { Box, styled } from "@mui/material";

const BonusTextBlock = styled(Box)(({ theme }) => ({
  gridColumn: "1 / -1",
  textAlign: "center",
  marginTop: theme.spacing(4),
}));

export default BonusTextBlock;