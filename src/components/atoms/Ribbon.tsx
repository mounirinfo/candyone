"use client";
import { Box, Typography, styled } from "@mui/material";

const RibbonBox = styled(Box)(() => ({
  background: "#000",
  color: "#fff",
  padding: "6px 16px",
  borderRadius: 9999,
  display: "inline-block",
  marginTop: 8,
}));

export const Ribbon = ({ children }: { children: string }) => (
  <RibbonBox>
    <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{children}</Typography>
  </RibbonBox>
);
