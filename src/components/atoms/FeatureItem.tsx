"use client";
import { Box, Typography } from "@mui/material";
import { Check } from "lucide-react";

export const FeatureItem = ({ children }: { children: string }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <Check size={20} color="#ff48b0" />
    <Typography sx={{ fontSize: 16 }}>{children}</Typography>
  </Box>
);
