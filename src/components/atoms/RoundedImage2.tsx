"use client"
import { Box, styled } from "@mui/material";

const RoundedImage = styled(Box)(({ theme }) => ({
  borderRadius: 18,
  overflow: "hidden",
  img: { display: "block", width: "100%", height: "auto" },
}));

export default RoundedImage;