"use client";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

interface CtaButtonProps {
  accentColor: string;
}

export const CtaButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "accentColor", 
})<CtaButtonProps>(({ accentColor }) => ({
  textTransform: "none",
  borderRadius: "30px",
  padding: "16px 50px",
  fontWeight: "bold",
  fontSize: "1.2rem",
  backgroundColor: "#000000ff",
  color: accentColor,
  border: `2px solid ${accentColor}`,
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  "&:hover": {
    backgroundColor: accentColor,
    color: "#fff",
    opacity: 0.9,
  },
}));
