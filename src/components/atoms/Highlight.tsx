"use client";

import { styled } from "@mui/material";
import { Pink } from "./color";

const Highlight = styled("span")<{ pink?: boolean }>(({ pink }) => ({
  fontWeight: 900,
  fontSize: 34,
  color: pink ? Pink : "#000",
  textTransform: "uppercase",
}));

export default Highlight;