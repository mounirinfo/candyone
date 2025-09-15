"use client";

import { Stack, styled } from "@mui/material";

const BulletRow = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "flex-start",
  gap: theme.spacing(1.25),
}));

export default BulletRow;