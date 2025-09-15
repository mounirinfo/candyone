"use client";
import { Button } from "@mui/material";

export const BigCTA = ({
  children,
  onClick,
}: {
  children: string;
  onClick?: () => void;
}) => (
  <Button
    onClick={onClick}
    sx={{
      mt: 3,
      background: "linear-gradient(90deg,#ff48b0,#ff7ecb)",
      color: "#fff",
      px: 4,
      py: 1.5,
      borderRadius: 9999,
      fontWeight: 700,
      "&:hover": {
        background: "linear-gradient(90deg,#ff7ecb,#ff48b0)",
      },
    }}
  >
    {children}
  </Button>
);
