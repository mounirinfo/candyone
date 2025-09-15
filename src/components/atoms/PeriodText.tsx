"use client";
import { Typography } from "@mui/material";

export const PeriodText = ({ children }: { children: string }) => (
  <Typography sx={{ fontSize: 16, color: "#666" }}>{children}</Typography>
);
