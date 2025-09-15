"use client";

import { Stack, styled } from "@mui/material";

const FeatureRow = styled(Stack)(({ theme }) => ({
  textAlign: "center",
  alignItems: "center",
  gap: theme.spacing(0.1),
  padding: theme.spacing(1, 1),
}));

export default FeatureRow;