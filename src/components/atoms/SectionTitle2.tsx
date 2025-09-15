"use client";
import { Typography } from "@mui/material";

export const SectionTitle = ({ children }: { children: string }) => (
  <Typography
    sx={{
      position: "absolute",
      top: -30,
      left: "50%",
      transform: "translateX(-50%)",
      background: "#fff",
      px: 2,
      fontWeight: 900,
      fontSize: 28,
    }}
  >
    {children}
  </Typography>
);
