"use client";
import { Typography, styled } from "@mui/material";

const PriceBox = styled("div")(() => ({
  backgroundColor: "#ff48b0",
  color: "#fff",
  fontWeight: 700,
  fontSize: 28,
  borderRadius: 16,
  padding: "8px 20px",
  textAlign: "center",
}));

export const PriceBadge = ({ children }: { children: string }) => (
  <PriceBox>{children}</PriceBox>
);
